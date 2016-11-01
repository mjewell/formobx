import { FormStore, IFormStoreOptions } from '../stores';
import { IMap, IStringMap } from '../types';
import * as React from 'react';

export interface IOnSubmit {
  (field: IStringMap): any;
}

export interface IWrappedOnSubmit {
  (e: React.FormEvent<any>): void;
}

export interface IWrappedFormProps {
  form: FormStore;
  onSubmit: IWrappedOnSubmit;
}

export interface IFormOptions extends IFormStoreOptions {
  onSubmit: IOnSubmit;
  initialValues?: IMap;
}

export interface IForm<Props> extends React.ComponentClass<Props> { }

function wrapOnSubmit(store: FormStore, callback: IOnSubmit) {
  return (e: React.FormEvent<any>) => {
    e.preventDefault();
    store.setSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.value))
      .catch(result => store.setErrors(result))
      .then(() => store.setSubmitting(false));
  };
}

export function form<Props>(
  Component: React.ComponentClass<Props & IWrappedFormProps>,
  options: IFormOptions
): IForm<Props> {
  return class Form extends React.Component<Props, {}> {
    public static childContextTypes = {
      parentStore: React.PropTypes.object
    };
    private store: FormStore;
    private onSubmit: IWrappedOnSubmit;

    constructor(props: Props) {
      super(props);
      this.store = new FormStore(options);

      if (options.onSubmit) {
        this.onSubmit = wrapOnSubmit(this.store, options.onSubmit);
      }
    }

    public getChildContext() {
      return { parentStore: this.store };
    }

    public render() {
      return <Component {...this.props} form={this.store} onSubmit={this.onSubmit} />;
    }
  };
}
