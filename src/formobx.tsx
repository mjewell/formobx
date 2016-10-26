import { FormobxRootStore, IStoreOptions } from './formobxRootStore';
import { IMap } from './types';
import * as React from 'react';

export interface IOnSubmit {
  (field: { [s: string]: string }): any;
}

export interface IWrappedOnSubmit {
  (e: React.FormEvent<any>): void;
}

export interface IWrappedFormProps {
  form: FormobxRootStore;
  onSubmit: IWrappedOnSubmit;
}

export interface IFormobxOptions extends IStoreOptions {
  onSubmit: IOnSubmit;
  initialValues?: IMap;
}

export interface IForm<Props> extends React.ComponentClass<Props> { }

function wrapOnSubmit(store: FormobxRootStore, callback: IOnSubmit) {
  return (e: React.FormEvent<any>) => {
    e.preventDefault();
    store.setSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.value))
      .catch(result => store.setAllErrors(result))
      .then(() => store.setSubmitting(false));
  };
}

export function formobx<Props>(
  component: React.ComponentClass<Props & IWrappedFormProps>,
  options: IFormobxOptions
): IForm<Props> {
  return class Form extends React.Component<Props, {}> {
    public static childContextTypes = {
      parentStore: React.PropTypes.object
    };
    private store: FormobxRootStore;
    private component: React.ComponentClass<Props & IWrappedFormProps>;
    private onSubmit: IWrappedOnSubmit;

    constructor(props: Props) {
      super(props);
      this.store = new FormobxRootStore(options);
      this.component = component;

      if (options.onSubmit) {
        this.onSubmit = wrapOnSubmit(this.store, options.onSubmit);
      }
    }

    public getChildContext() {
      return { parentStore: this.store };
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
