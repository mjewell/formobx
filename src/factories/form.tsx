import { FormStore } from '../stores';
import { IMap, IStringMap } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass, FormEvent, PropTypes, StatelessComponent } from 'react';
import * as React from 'react';

export interface IOnSubmit {
  (form: IStringMap, ...otherArgs: any[]): any;
}

// TODO: should this return the promise so you can do stuff with it after errors are set? - probably
export interface IWrappedOnSubmit {
  (e: FormEvent<any>, ...otherArgs: any[]): void;
}

export interface IWrappedFormProps {
  form: FormStore;
  onSubmit: IWrappedOnSubmit;
}

export interface IFormOptions<Props> {
  initialValues: IMap | ((props: Props) => IMap) | undefined;
  onSubmit: IOnSubmit;
};

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

export function form<Props>(options: IFormOptions<Props>) {
  type EnhancedProps = Props & IWrappedFormProps;
  type ReactComponent = ComponentClass<EnhancedProps> | StatelessComponent<EnhancedProps>;

  return (FormComponent: ReactComponent): ComponentClass<Props> => {
    const WrappedComponent = observer(FormComponent as ComponentClass<EnhancedProps>);

    return class FormobxForm extends Component<Props, {}> {
      public static childContextTypes = {
        parentStore: PropTypes.object
      };
      protected store: FormStore;
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

      public getChildContext() {
        return { parentStore: this.store };
      }

      public render() {
        return (
          <WrappedComponent
            {...this.props}
            form={this.store}
            onSubmit={this.onSubmit}
            />
        );
      }
    };
  };
}
