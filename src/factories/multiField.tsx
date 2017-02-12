import { ReactComponent } from '../types';
import { IStoresMap, IWithStoresResultProps, IWithStoresParamProps, withFieldsRegistered, withParentStore, withStores } from '../wrappers';
import { observer } from 'mobx-react';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IWrappedMultiFieldProps {
  fields: IStoresMap;
}

export function multiField<Props>(
  MultiFieldComponent: ReactComponent<Props & IWithStoresResultProps & IWrappedMultiFieldProps>
) {
  const WrappedComponent = observer(
    MultiFieldComponent as ComponentClass<Props & IWithStoresResultProps & IWrappedMultiFieldProps>
  );

  class FormobxMultiField extends Component<Props & IWithStoresParamProps, {}> {
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

  return withParentStore(withFieldsRegistered(withStores(FormobxMultiField)));
}
