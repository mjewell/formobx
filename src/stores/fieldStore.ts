import { IFieldErrors } from '../types';
import { FieldErrors } from './fieldErrors';
import { ParentStore } from './types';
import { IObservableArray, action, computed, observable } from 'mobx';
import * as React from 'react';

export class FieldStore {
  public parent: ParentStore;
  @observable public value: any = '';
  private fieldErrors = new FieldErrors();

  @computed
  get asProps() {
    return {
      onChange: (e: React.FormEvent<any>) => {
        const target = e.target as any;
        this.setValue(target.value);
      },
      value: this.value
    };
  }

  @action
  public setInitialValues(initialValue?: any) {
    this.setValue(initialValue || '');
  }

  @action
  public setValue(val: any) {
    this.value = val;
  }

  // TODO: see if we can use delegation to remove these 3 methods
  @computed
  get errors(): IObservableArray<string> {
    return this.fieldErrors.errors;
  }

  @action
  public clearErrors() {
    this.fieldErrors.clearErrors();
  }

  @action
  public setErrors(errors: IFieldErrors) {
    this.fieldErrors.setErrors(errors);
  }
}
