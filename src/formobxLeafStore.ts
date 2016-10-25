import { ParentStore } from './formobxNodeStore';
import {
  IObservableArray,
  action,
  computed,
  observable
} from 'mobx';
import * as React from 'react';

export class FormobxLeafStore {
  public parent: ParentStore;
  @observable public value: any;
  public errors: IObservableArray<string> = observable<string>([]);

  @computed
  get asProps() {
    return {
      defaultValue: this.value,
      onChange: (e: React.FormEvent<any>) => {
        const target = e.target as any;
        this.setValue(target.value);
      }
    };
  }

  @action
  public setInitialValues(initialValue: any) {
    if (!initialValue) {
      this.setValue('');
      return;
    }
    this.setValue(initialValue);
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
