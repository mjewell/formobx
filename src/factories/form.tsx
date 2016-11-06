import { FormStore, IFormStoreOptions } from '../stores';
import { IMap, IStringMap } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass, FormEvent, PropTypes, StatelessComponent } from 'react';
import * as React from 'react';

export interface IOnSubmit {
  (field: IStringMap): any;
}

export interface IWrappedOnSubmit {
  (e: FormEvent<any>): void;
}

export interface IWrappedFormProps {
  form: FormStore;
  onSubmit: IWrappedOnSubmit;
}

export interface IFormOptions extends IFormStoreOptions {
  onSubmit: IOnSubmit;
  initialValues?: IMap;
}

function wrapOnSubmit(store: FormStore, callback: IOnSubmit) {
  return (e: FormEvent<any>) => {
    e.preventDefault();
    store.setSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.value))
      .catch(result => store.setErrors(result))
      .then(() => store.setSubmitting(false));
  };
}

export function form<Props>(options: IFormOptions) {
  type ReactComponent = ComponentClass<Props & IWrappedFormProps> | StatelessComponent<Props & IWrappedFormProps>;
  return (WrappedComponent: ReactComponent): ComponentClass<Props> => {
    const WC = observer(WrappedComponent as ComponentClass<Props & IWrappedFormProps>);

    class Form extends Component<Props, {}> {
      public static childContextTypes = {
        parentStore: PropTypes.object
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
        return <WC {...this.props} form={this.store} onSubmit={this.onSubmit} />;
      }
    }

    return Form;
  };
}
