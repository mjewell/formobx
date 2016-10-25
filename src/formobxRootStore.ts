import { FormobxNodeStore } from './formobxNodeStore';
import { IMap } from './types';
import {
  action,
  observable
} from 'mobx';

export interface IStoreOptions {
  initialValues?: IMap;
}

export class FormobxRootStore extends FormobxNodeStore {
  @observable public submitting = false;

  constructor(options: IStoreOptions) {
    super();
    this.initialValues = options.initialValues || {};
  }

  @action
  public setSubmitting(submitting: boolean) {
    this.submitting = submitting;
  }
}
