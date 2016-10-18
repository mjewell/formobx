import { IStoreOptions, Store } from './store';
import * as React from 'react';

export interface IOnSubmit {
  (field: { [s: string]: string }): any;
}

export interface IWrappedOnSubmit {
  (e: React.FormEvent<any>): void;
}

export interface IWrappedFormProps {
  form: Store;
  onSubmit: IWrappedOnSubmit;
}

export interface IFormobxOptions extends IStoreOptions {
  onSubmit: IOnSubmit;
}

export interface IForm<Props> extends React.ComponentClass<Props> { }

function wrapOnSubmit(store: Store, callback: IOnSubmit) {
  return (e: React.FormEvent<any>) => {
    e.preventDefault();
    store.updateSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.fieldValues))
      .catch(result => store.updateAllErrors(result))
      .then(() => store.updateSubmitting(false));
  };
}

export function formobx<Props>(
  component: React.ComponentClass<Props & IWrappedFormProps>,
  options: IFormobxOptions
): IForm<Props> {
  return class Form extends React.Component<Props, {}> {
    public static childContextTypes = {
      formStore: React.PropTypes.object
    };
    private store: Store;
    private component: React.ComponentClass<Props & IWrappedFormProps>;
    private onSubmit: IWrappedOnSubmit;

    constructor(props: Props) {
      super(props);
      this.store = new Store(options);
      this.component = component;

      if (options.onSubmit) {
        this.onSubmit = wrapOnSubmit(this.store, options.onSubmit);
      }
    }

    public getChildContext() {
      return { formStore: this.store };
    }

    public render() {
      return (
        <this.component
          {...this.props}
          form={this.store}
          onSubmit={this.onSubmit}
          />
      );
    }
  };
}
