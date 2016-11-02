import { IMap, IObjectErrors, isArrayErrors, isFieldErrors, isObjectErrors } from '../types';
import { ArrayStore } from './arrayStore';
import { ChildStore, ParentStore } from './types';
import * as keys from 'lodash/keys';
import {
  IObservableArray,
  ObservableMap,
  action,
  asMap,
  computed,
  observable
} from 'mobx';
const mapValues = require('lodash/fp/mapValues');

const mapValuesToJS = mapValues((f: ChildStore) => f.value);

export class ObjectStore {
  public parent: ParentStore;
  @observable public fields: ObservableMap<ChildStore> = asMap<ChildStore>({});
  public errors: IObservableArray<string> = observable<string>([]);
  protected initialValues: IMap;

  constructor() {
    this.setInitialValues();
  }

  @computed
  get value() {
    return mapValuesToJS(this.fields.toJS());
  }

  @action
  public registerField(name: string, field: ChildStore) {
    if (this.fields.has(name)) {
      throw new Error(`Field with name '${name}' already exists on this part of the form`);
    }

    if (name === '_base') {
      throw new Error("Field cannot have reserved name '_base'");
    }

    this.fields.set(name, field);
    field.setInitialValues(this.initialValues[name]);
    field.parent = this;
  }

  @action
  public unregisterField(name: string) {
    this.fields.delete(name);
  }

  @action
  public setInitialValues(initialValues?: any) {
    if (!initialValues) {
      this.initialValues = {};
      return;
    }
    this.initialValues = initialValues;
    this.fields.keys().forEach(key => this.fields.get(key).setInitialValues(initialValues[key]));
  }

  @action
  public clearErrors() {
    this.fields.values().forEach(field => field.clearErrors());
    this.errors.clear();
  }

  @action
  public setErrors(errors: IObjectErrors) {
    keys(errors).forEach(key => {
      const field = this.fields.get(key);
      const error = errors[key];
      if (field) {
        if (field instanceof ArrayStore) {
          if (isArrayErrors(error)) {
            field.setErrors(error);
          }
        } else if (field instanceof ObjectStore) {
          if (isObjectErrors(error)) {
            field.setErrors(error);
          }
        } else {
          if (isFieldErrors(error)) {
            field.setErrors(error);
          }
        }
      }
    });

    this.errors.replace(errors._base || []);
  }
}
