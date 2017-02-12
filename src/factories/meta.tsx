import { ParentStore } from '../stores';
import { ReactComponent } from '../types';
import { IWithParentStoreParamProps, withParentStore } from '../wrappers';
import { observer } from 'mobx-react';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IWrappedMetaProps {
  field: ParentStore;
}

export function meta<Props>(
  MetaComponent: ReactComponent<Props & IWrappedMetaProps>
): ComponentClass<Props> {
  const WrappedComponent = observer(MetaComponent as ComponentClass<Props & IWrappedMetaProps>);

  class FormobxMeta extends Component<Props & IWithParentStoreParamProps, {}> {
    public render() {
      // TODO: when can we replace this with { __formobx, ...props } = this.props
      const { __formobx } = this.props;
      const props = {
        field: __formobx.parentStore,
        ...this.props as any,
        __formobx: undefined
      };

      return <WrappedComponent {...props} />;
    }
  }

  return withParentStore(FormobxMeta);
}
