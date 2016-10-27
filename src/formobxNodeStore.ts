import { FormobxLeafStore } from './formobxLeafStore';
import { FormobxRootStore } from './formobxRootStore';
import { IFormobxErrors, IMap } from './types';
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

export type ChildStore = FormobxLeafStore | FormobxNodeStore;
export type ParentStore = FormobxNodeStore | FormobxRootStore;

const getValues = mapValues((f: ChildStore) => f.value);

function isNodeStore(store: ChildStore): store is FormobxNodeStore {
  return <FormobxNodeStore>store !== undefined;
}

export class FormobxNodeStore {
  public parent: ParentStore;
  @observable public fields: ObservableMap<ChildStore> = asMap<ChildStore>({});
  public errors: IObservableArray<string> = observable<string>([]);
  protected initialValues: IMap;

  constructor() {
    this.setInitialValues();
  }

  @computed
  get value() {
    return getValues(this.fields.toJS());
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
  public setErrors(errors: IFormobxErrors) {
    keys(errors).forEach(key => {
      const field = this.fields.get(key);
      if (field) {
        if (isNodeStore(field)) {
          field.setErrors(errors[key] as IFormobxErrors);
        } else {
          field.setErrors(errors[key] as string[]);
        }
      }
    });

    this.errors.replace(errors._base || []);
  }
}
