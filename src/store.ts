import { FieldStore } from './components/field';
import * as keys from 'lodash/keys';
import {
  IKeyValueMap,
  IObservableArray,
  ObservableMap,
  action,
  asMap,
  computed,
  observable
} from 'mobx';
const mapValues = require('lodash/fp/mapValues');

export interface IStringMap {
  [s: string]: string;
}

export interface IStoreOptions {
  initialValues?: IStringMap;
}

const getValues = mapValues((f: FieldStore) => f.value);
const getErrors = mapValues((f: FieldStore) => f.errors);

export class Store {
  @observable public submitting = false;
  @observable public fields: ObservableMap<FieldStore> = asMap<FieldStore>({});
  public errors: IObservableArray<string> = observable([]);
  private initialValues: IStringMap;

  constructor(options: IStoreOptions) {
    this.initialValues = options.initialValues || {};
  }

  @computed
  get fieldsJS(): IKeyValueMap<FieldStore> {
    return this.fields.toJS();
  }

  @computed
  get fieldValues(): IStringMap {
    return getValues(this.fieldsJS);
  }

  @computed
  get fieldErrors(): IStringMap {
    return getErrors(this.fieldsJS);
  }

  @action
  public addField(name: string, field: FieldStore) {
    if (this.fields.has(name)) {
      throw new Error(`Field with name '${name}' already exists on this form`);
    }

    this.fields.set(name, field);

    field.updateValue(this.initialValues[name] || '');
  }

  @action
  public updateSubmitting(submitting: boolean) {
    this.submitting = submitting;
  }

  @action
  public clearErrors() {
    this.fields.values().forEach(field => field.clearErrors());
    this.errors.clear();
  }

  @action
  public updateErrors(errors: string[]) {
    this.errors.replace(errors);
  }

  @action
  public updateAllErrors(errors: { [s: string]: string[] | undefined, _base?: string[] }) {
    keys(errors).forEach(key => {
      if (this.fields.has(key)) {
        this.fields.get(key).updateErrors(errors[key] || []);
      }
    });

    this.updateErrors(errors._base || []);
  }
}
