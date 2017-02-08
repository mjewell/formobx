import { BaseField, ChildField, Field, IFieldNewRequiredProps, IFieldOldRequiredProps } from '../fields';
import { FieldStore } from '../stores';
import { observer } from 'mobx-react';
import { Component, ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedFieldProps {
  field: FieldStore;
}

function generateClass<Props>(
  FieldComponent: (
    ComponentClass<Props & IWrappedFieldProps> |
    StatelessComponent<Props & IWrappedFieldProps> |
    string
  )
) {
  if (typeof FieldComponent !== 'string') {
    const WrappedComponent = observer(FieldComponent as ComponentClass<Props & IWrappedFieldProps>);

    return class extends Component<Props & IFieldOldRequiredProps, {}> {
      public render() {
        const props = {
          field: this.props.store,
          fields: undefined,
          parentStore: undefined,
          store: undefined
        };

        return <WrappedComponent {...this.props} {...props} />;
      }
    };
  } else if (FieldComponent === 'input') {
    return class extends Component<Props & IFieldOldRequiredProps, {}> {
      public render() {
        const props = {
          ...this.props.store.asProps,
          fields: undefined,
          parentStore: undefined,
          store: undefined
        };

        return <input {...this.props} {...props} />;
      }
    };
  } else {
    throw new Error(`Unsupported string component type '${FieldComponent}'`);
  }
}

export function field<Props>(
  FieldComponent: (
    ComponentClass<Props & IWrappedFieldProps> |
    StatelessComponent<Props & IWrappedFieldProps> |
    string
  )
) {
  const FormobxField = generateClass(FieldComponent);
  return BaseField(ChildField(Field(FormobxField)));
}
