import { ParentStore } from './types';
import { IObservableArray, action, computed, observable } from 'mobx';
import * as React from 'react';

export class FieldStore {
  public parent: ParentStore;
  @observable public value: any = '';
  public errors: IObservableArray<string> = observable<string>([]);

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

  @action
  public clearErrors() {
    this.errors.clear();
  }

  @action
  public setErrors(errors: string[]) {
    this.errors.replace(errors);
  }
}
