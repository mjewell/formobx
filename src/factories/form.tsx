import { FormStore, IFormStoreOptions } from '../stores';
import { IMap, IStringMap } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass, FormEvent, StatelessComponent } from 'react';
import * as React from 'react';

export interface IOnSubmit {
  (form: IStringMap, ...otherArgs: any[]): any;
}

export interface IWrappedOnSubmit {
  (e: FormEvent<any>, ...otherArgs: any[]): void;
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
  return (e: FormEvent<any>, ...otherArgs: any[]) => {
    e.preventDefault();
    store.setSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.value, ...otherArgs))
      .catch(result => store.setErrors(result))
      .then(() => store.setSubmitting(false));
  };
}

export function form<Props>(options: IFormOptions) {
  type ReactComponent = ComponentClass<Props & IWrappedFormProps> | StatelessComponent<Props & IWrappedFormProps>;

  return (FormComponent: ReactComponent): ComponentClass<Props> => {
    const WrappedComponent = observer(FormComponent as ComponentClass<Props & IWrappedFormProps>);

    class FormobxForm extends Component<Props, {}> {
      public static childContextTypes = {
        parentStore: React.PropTypes.object
      };
      protected store: FormStore;
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
        return (
          <WrappedComponent
            {...this.props}
            form={this.store}
            onSubmit={this.onSubmit}
            />
        );
      }
    }

    return FormobxForm;
  };
}
