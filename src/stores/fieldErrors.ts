import { IFieldErrors } from '../types';
import { IObservableArray, action, observable } from 'mobx';

export class FieldErrors {
  public errors: IObservableArray<string> = observable<string>([]);

  @action
  public clearErrors(): void {
    this.errors.clear();
  }

  @action
  public setErrors(errors: IFieldErrors) {
    this.errors.replace(errors || []);
  }
}
