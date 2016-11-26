import { Field, IFieldProps } from '../components';
import { FieldStore } from '../stores';
import { observer } from 'mobx-react';
import { ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedFieldProps extends IFieldProps {
  field: FieldStore;
}

// TODO: add prepublish build script

export function field<Props>(
  FieldComponent: (
    ComponentClass<Props & IWrappedFieldProps> |
    StatelessComponent<Props & IWrappedFieldProps> |
    string
  )
): ComponentClass<Props & IFieldProps> {
  let WrappedComponent: ComponentClass<Props & IWrappedFieldProps> | undefined;
  if (typeof FieldComponent !== 'string') {
    WrappedComponent = observer(FieldComponent as ComponentClass<Props & IWrappedFieldProps>);
  }

  class FormobxField extends Field<Props> {
    public render() {
      // TODO: handle other string types
      if (!WrappedComponent) {
        if (FieldComponent === 'input') {
          return <input {...this.props} {...this.store.asProps} />;
        }
        throw new Error('Unsupported string component type');
      }

      return <WrappedComponent {...this.props} field={this.store} />;
    }
  }

  return FormobxField;
}
