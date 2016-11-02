import { IArrayErrors, isArrayErrors, isFieldErrors, isObjectErrors } from '../types';
import { ObjectStore } from './objectStore';
import { ChildStore, ParentStore } from './types';
import { IObservableArray, action, computed, observable } from 'mobx';

export class ArrayStore {
  public parent: ParentStore;
  public fields: IObservableArray<ChildStore> = observable<ChildStore>([]);
  public errors: IObservableArray<string> = observable<string>([]);
  protected initialValues: any[];

  constructor() {
    this.setInitialValues();
  }

  @computed
  get value(): any {
    return this.fields.map(field => field.value);
  }

  @action
  public registerField(field: ChildStore) {
    this.fields.push(field);
    field.setInitialValues(this.initialValues[this.fields.length - 1]);
    field.parent = this;
  }

  @action
  public unregisterField(field: ChildStore) {
    this.fields.remove(field);
  }

  @action
  public setInitialValues(initialValues?: any) {
    if (!initialValues) {
      this.initialValues = [];
      return;
    }
    this.initialValues = initialValues;
    this.fields.forEach((field, i) => field.setInitialValues(initialValues[i]));
  }

  @action
  public clearErrors() {
    this.fields.forEach(field => field.clearErrors());
    this.errors.clear();
  }

  @action
  public setErrors(errors: IArrayErrors) {
    errors.forEach((error, i) => {
      const field = this.fields[i];
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
