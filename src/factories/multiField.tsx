import { IMultiFieldProps, IMultiFieldStores, MultiField } from '../components';
import { observer } from 'mobx-react';
import { ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedMultiFieldProps extends IMultiFieldProps {
  fields: IMultiFieldStores;
}

export function multiField<Props>(
  MultiFieldComponent: (
    ComponentClass<Props & IWrappedMultiFieldProps> |
    StatelessComponent<Props & IWrappedMultiFieldProps>
  )
): ComponentClass<Props & IMultiFieldProps> {
  const WrappedComponent = observer(MultiFieldComponent as ComponentClass<Props & IWrappedMultiFieldProps>);

  return class FormobxMultiField extends MultiField<Props> {
    public render() {
      return <WrappedComponent {...this.props} fields={this.stores} />;
    }
  };
}
