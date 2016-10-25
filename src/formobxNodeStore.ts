import { FormobxLeafStore } from './formobxLeafStore';
import { FormobxRootStore } from './formobxRootStore';
import { IMap } from './types';
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
  }

  @action
  public clearErrors() {
    this.fields.values().forEach(field => field.clearErrors());
    this.errors.clear();
  }

  @action
  public setErrors(errors: string[]) {
    this.errors.replace(errors);
  }

  @action
  public setAllErrors(errors: { [s: string]: string[] | undefined, _base?: string[] }) {
    keys(errors).forEach(key => {
      if (this.fields.has(key)) {
        this.fields.get(key).setErrors(errors[key] || []);
      }
    });

    this.setErrors(errors._base || []);
  }
}
