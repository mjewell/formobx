import {
  BaseField,
  ChildField,
  IMultiFieldNewRequiredProps,
  IMultiFieldOldRequiredProps,
  IMultiFieldStores,
  MultiField
} from '../fields';
import { observer } from 'mobx-react';
import { Component, ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedMultiFieldProps {
  fields: IMultiFieldStores;
}

export function multiField<Props>(
  MultiFieldComponent: (
    ComponentClass<Props & IWrappedMultiFieldProps> |
    StatelessComponent<Props & IWrappedMultiFieldProps>
  )
) {
  const WrappedComponent = observer(MultiFieldComponent as ComponentClass<Props & IWrappedMultiFieldProps>);

  class FormobxMultiField extends Component<Props & IMultiFieldOldRequiredProps, {}> {
    public render() {
      const props = {
        fields: this.props.stores,
        parentStore: undefined,
        store: undefined
      };

      return <WrappedComponent {...this.props} {...props} />;
    }
  }

  return BaseField(ChildField(MultiField(FormobxMultiField)));
}
