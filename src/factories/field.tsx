import { BaseField, ChildField, Field, IFieldParamProps, IFieldResultProps } from '../fields';
import { FieldStore } from '../stores';
import { ReactComponent } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IWrappedFieldProps {
  field: FieldStore;
}

function generateClass<Props>(
  FieldComponent: ReactComponent<Props & IFieldResultProps & IWrappedFieldProps> | string
) {
  if (typeof FieldComponent !== 'string') {
    const WrappedComponent = observer(FieldComponent as ComponentClass<Props & IFieldResultProps & IWrappedFieldProps>);

    return class extends Component<Props & IFieldParamProps, {}> {
      public render() {
        const { __formobx } = this.props;
        const props = {
          field: __formobx.store,
          ...this.props as any,
          __formobx: undefined
        };

        return <WrappedComponent {...props} />;
      }
    };
  } else if (FieldComponent === 'input') {
    return class extends Component<Props & IFieldParamProps, {}> {
      public render() {
        const { __formobx } = this.props;
        const props = {
          ...__formobx.store.asProps,
          ...this.props as any,
          __formobx: undefined
        };

        return <input {...props} />;
      }
    };
  } else {
    throw new Error(`Unsupported string component type '${FieldComponent}'`);
  }
}

export function field<Props>(
  FieldComponent: ReactComponent<Props & IFieldResultProps & IWrappedFieldProps> | string
) {
  const FormobxField = generateClass(FieldComponent);
  return BaseField(ChildField(Field(FormobxField)));
}
