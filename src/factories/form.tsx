import { IFormFieldParamProps, IFormOptions, IWrappedOnSubmit, ParentField, createFormField } from '../fields';
import { FormStore } from '../stores';
import { ReactComponent } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IWrappedFormProps {
  form: FormStore;
  onSubmit: IWrappedOnSubmit;
}

export function form<Props>(options: IFormOptions<Props>) {
  type EnhancedProps = Props & IWrappedFormProps;

  return (FormComponent: ReactComponent<EnhancedProps>) => {
    const WrappedComponent = observer(FormComponent as ComponentClass<Props & IWrappedFormProps>);

    class FormobxForm extends Component<Props & IFormFieldParamProps, {}> {
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

    return createFormField(options)(ParentField(FormobxForm));
  };
}
