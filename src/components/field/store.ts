import {
  IObservableArray,
  action,
  computed,
  observable
} from 'mobx';
import * as React from 'react';

export default class Store {
  @observable public value = '';
  public errors: IObservableArray<string> = observable<string>([]);

  @computed
  get asProps() {
    return {
      onChange: (e: React.FormEvent<any>) => {
        const target = e.target as any;
        this.updateValue(target.value);
      },
      value: this.value
    };
  }

  @action
  public updateValue(val: string) {
    this.value = val;
  }

  @action
  public clearErrors() {
    this.errors.clear();
  }

  @action
  public updateErrors(errors: string[]) {
    this.errors.replace(errors);
  }
}
