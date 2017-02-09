import { FormStore } from '../stores';
import { IMap, IStringMap, ReactComponent } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass, FormEvent } from 'react';
import * as React from 'react';

export interface IOnSubmit {
  (form: IStringMap, ...otherArgs: any[]): any;
}

// TODO: should this return the promise so you can do stuff with it after errors are set? - probably
export interface IWrappedOnSubmit {
  (e: FormEvent<any>, ...otherArgs: any[]): void;
}

export interface IFormOptions<Props> {
  initialValues: IMap | ((props: Props) => IMap) | undefined;
  onSubmit: IOnSubmit;
};

export interface IFormFieldParamProps {
  __formobx: {
    store: FormStore;
    onSubmit: IWrappedOnSubmit;
  };
}

function wrapOnSubmit(store: FormStore, callback: IOnSubmit) {
  return (e: FormEvent<any>, ...otherArgs: any[]) => {
    e.preventDefault();
    store.setSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.value, ...otherArgs))
      .catch(result => store.setErrors(result))
      .then(() => store.setSubmitting(false));
  };
}

export function createFormField<Props>(options: IFormOptions<Props>) {
  type EnhancedProps = Props & IFormFieldParamProps;

  return (WrappedComponent: ReactComponent<EnhancedProps>): ComponentClass<Props> => {
    class FormobxForm extends Component<Props, {}> {
      private store: FormStore;
      private onSubmit: IWrappedOnSubmit;

      constructor(props: Props) {
        super(props);

        const componentOptions = { ...options };

        if (typeof componentOptions.initialValues === 'function') {
          componentOptions.initialValues = componentOptions.initialValues(props);
        }

        this.store = new FormStore(componentOptions);

        if (componentOptions.onSubmit) {
          this.onSubmit = wrapOnSubmit(this.store, componentOptions.onSubmit);
        }
      }

      public render() {
        const formobxProps = {
          onSubmit: this.onSubmit,
          store: this.store
        };

        return (
          <WrappedComponent
            {...this.props}
            __formobx={formobxProps}
          />
        );
      }
    }

    return FormobxForm;
  };
}
