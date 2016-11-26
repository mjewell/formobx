import { IMap } from '../types';
import { ObjectStore } from './objectStore';
import { action, observable } from 'mobx';

export interface IFormStoreOptions {
  initialValues?: IMap;
}

export class FormStore extends ObjectStore {
  @observable public submitting = false;

  constructor(options: IFormStoreOptions) {
    super();
    this.setInitialValues(options.initialValues);
  }

  @action
  public setSubmitting(submitting: boolean) {
    this.submitting = submitting;
  }
}
