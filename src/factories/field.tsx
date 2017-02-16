import { FieldStore } from '../stores';
import { ReactComponent } from '../types';
import { IFieldData, IWithStoreParamProps, createWithStore, withFieldsRegistered, withParentStore } from '../wrappers';
import { observer } from 'mobx-react';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IWrappedFieldProps {
  field: FieldStore;
  name?: string;
}

function generateClass<Props>(
  FieldComponent: ReactComponent<Props & IWrappedFieldProps> | string
) {
  if (typeof FieldComponent !== 'string') {
    const WrappedComponent = observer(FieldComponent as ComponentClass<Props & IWrappedFieldProps>);

    return class extends Component<Props & IWithStoreParamProps<FieldStore>, {}> {
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
    return class extends Component<Props & IWithStoreParamProps<FieldStore>, {}> {
      public render() {
        const { __formobx } = this.props;
        const props = {
          ...__formobx.store.asProps,
          ...this.props as any
        };
        delete props.__formobx;

        return <input {...props} />;
      }
    };
  } else {
    throw new Error(`Unsupported string component type '${FieldComponent}'`);
  }
}

export function field<Props>(
  FieldComponent: ReactComponent<Props & IWrappedFieldProps> | string
) {
  const FormobxField = generateClass(FieldComponent);
  return withParentStore(withFieldsRegistered(createWithStore(FieldStore)(FormobxField)));
}
