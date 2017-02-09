import {
  BaseField,
  ChildField,
  IMultiFieldParamProps,
  IMultiFieldResultProps,
  IMultiFieldStores,
  MultiField
} from '../fields';
import { ReactComponent } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IWrappedMultiFieldProps {
  fields: IMultiFieldStores;
}

export function multiField<Props>(
  MultiFieldComponent: ReactComponent<Props & IMultiFieldResultProps & IWrappedMultiFieldProps>
) {
  const WrappedComponent = observer(
    MultiFieldComponent as ComponentClass<Props & IMultiFieldResultProps & IWrappedMultiFieldProps>
  );

  class FormobxMultiField extends Component<Props & IMultiFieldParamProps, {}> {
    public render() {
      const { __formobx } = this.props;
      const props = {
        fields: __formobx.stores,
        ...this.props as any,
        __formobx: undefined
      };

      return <WrappedComponent {...props} />;
    }
  }

  return BaseField(ChildField(MultiField(FormobxMultiField)));
}
