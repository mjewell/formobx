import { IFieldErrors } from '../types';
import { FieldErrors } from './fieldErrors';
import { ParentStore } from './types';
import { IObservableArray, action, computed, observable } from 'mobx';
import * as React from 'react';
import { delegate } from 'sirmixalot';

class FieldStore {
  public parent: ParentStore;
  public errors: IObservableArray<string>;
  public clearErrors: () => void;
  public setErrors: (errors: IFieldErrors) => void;

  @observable public value: any = '';
  private fieldErrors = new FieldErrors(); // tslint:disable-line

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
}

delegate(FieldStore, 'fieldErrors', ['errors', 'clearErrors', 'setErrors']);

export { FieldStore };
