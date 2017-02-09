import { BaseField, IBaseFieldParamProps } from '../fields';
import { ParentStore } from '../stores';
import { observer } from 'mobx-react';
import { Component, ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedMetaProps {
  field: ParentStore;
}

export function meta<Props>(
  MetaComponent: (
    ComponentClass<Props & IWrappedMetaProps> |
    StatelessComponent<Props & IWrappedMetaProps>
  )
): ComponentClass<Props> {
  const WrappedComponent = observer(MetaComponent as ComponentClass<Props & IWrappedMetaProps>);

  class FormobxMeta extends Component<Props & IBaseFieldParamProps, {}> {
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

  return BaseField(FormobxMeta);
}
