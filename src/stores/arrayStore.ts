import setErrorsFor from '../services/setErrorsFor';
import setInitialValuesFor from '../services/setInitialValuesFor';
import { IArrayErrors } from '../types';
import { FieldErrors } from './fieldErrors';
import { ChildStore, ParentStore } from './types';
import { IObservableArray, action, computed, observable } from 'mobx';

export class ArrayStore {
  public parent: ParentStore;
  public fields: IObservableArray<ChildStore> = observable<ChildStore>([]);
  protected initialValues: any[] = [];
  private fieldErrors = new FieldErrors();

  @computed
  get value(): any[] {
    return this.fields.map(field => field.value);
  }

  // TODO: maybe add a key or something for faster removal
  @action
  public registerField(field: ChildStore) {
    this.fields.push(field);
    // TODO: should these be cleared as you go? if you add one, delete it, and add another, should that have the value set?
    // TODO: should you be able to say for all, instead of by index
    setInitialValuesFor(field, this.initialValues[this.fields.length - 1]);
    field.parent = this;
  }

  @action
  public unregisterField(field: ChildStore) {
    this.fields.remove(field);
  }

  @action
  public setInitialValues(initialValues?: any[]) {
    this.initialValues = initialValues || [];
    this.fields.forEach((field, i) => {
      setInitialValuesFor(field, this.initialValues[i]);
    });
  }

  @computed
  get errors(): IObservableArray<string> {
    return this.fieldErrors.errors;
  }

  @action
  public clearErrors() {
    this.fieldErrors.clearErrors();
    this.fields.forEach(field => field.clearErrors());
  }

  @action
  public setErrors(errors: IArrayErrors) {
    this.fieldErrors.setErrors(errors._base);
    errors.forEach((error, i) => setErrorsFor(this.fields[i], errors[i]));
  }
}
