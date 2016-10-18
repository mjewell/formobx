import {
  IObservableArray,
  action,
  computed,
  observable
} from 'mobx';
import * as React from 'react';

export class Store {
  @observable public value: any;
  public errors: IObservableArray<string> = observable([]);

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
  public updateValue(val: any) {
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
