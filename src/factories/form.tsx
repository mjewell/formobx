import { FormStore } from '../stores';
import { ReactComponent } from '../types';
import { IFormOptions, IWrappedOnSubmit, createWithFormProps, withParentStoreInContext } from '../wrappers';
import { observer } from 'mobx-react';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export type IFormParamProps = {
  form: FormStore;
  onSubmit: IWrappedOnSubmit;
}

export type IFormResultProps = {
  __formobx: {
    onSubmit: IWrappedOnSubmit;
    store: FormStore;
  };
};


export function form<Props>(options: IFormOptions<Props>) {
  type EnhancedProps = Props & IFormParamProps;

  return function FormobxForm(FormComponent: ReactComponent<EnhancedProps>) {
    const WrappedComponent = observer(FormComponent as ComponentClass<EnhancedProps>);

    class FormobxForm extends Component<Props & IFormResultProps, {}> {
      public render() {
        const { __formobx } = this.props;
        const props = {
          form: __formobx.store,
          onSubmit: __formobx.onSubmit,
          ...this.props as any,
          __formobx: undefined
        };

        return <WrappedComponent {...props} />;
      }
    }

    return createWithFormProps(options)(withParentStoreInContext<Props & IFormResultProps, FormStore>(FormobxForm));
  };
}
