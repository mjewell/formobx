import setErrorsFor from '../services/setErrorsFor';
import setInitialValuesFor from '../services/setInitialValuesFor';
import { IMap, IObjectErrors } from '../types';
import { ChildStore, ParentStore } from './types';
import * as keys from 'lodash/keys';
import { IObservableArray, ObservableMap, action, asMap, computed, observable } from 'mobx';
const mapValues = require('lodash/fp/mapValues');

const mapValuesToJS = mapValues((f: ChildStore) => f.value);

export class ObjectStore {
  public parent: ParentStore;
  @observable public fields: ObservableMap<ChildStore> = asMap<ChildStore>({});
  public errors: IObservableArray<string> = observable<string>([]);
  protected initialValues: IMap = {};

  @computed
  get value(): IMap {
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
    setInitialValuesFor(field, this.initialValues[name]);
    field.parent = this;
  }

  @action
  public unregisterField(name: string) {
    this.fields.delete(name);
  }

  @action
  public setInitialValues(initialValues?: IMap) {
    this.initialValues = initialValues || {};
    this.fields.keys().forEach(key => {
      setInitialValuesFor(this.fields.get(key), this.initialValues[key]);
    });
  }

  @action
  public clearErrors() {
    this.fields.values().forEach(field => field.clearErrors());
    this.errors.clear();
  }

  @action
  public setErrors(errors: IObjectErrors) {
    keys(errors).forEach(key => setErrorsFor(this.fields.get(key), errors[key]));
    this.errors.replace(errors._base || []);
  }
}
