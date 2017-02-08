import { BaseField, IBaseFieldPassThroughProps } from '../fields';
import { ParentStore } from '../stores';
import { observer } from 'mobx-react';
import { Component, ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IMetaProps {
  field: ParentStore;
}

export function meta<Props>(
  MetaComponent: (
    ComponentClass<Props & IMetaProps> |
    StatelessComponent<Props & IMetaProps>
  )
): ComponentClass<Props> {
  const WrappedComponent = observer(MetaComponent as ComponentClass<Props & IMetaProps>);

  class FormobxMeta extends Component<Props & IBaseFieldPassThroughProps, {}> {
    public render() {
      const props = {
        ...this.props as any, // TODO: remove this as any
        field: this.props.parentStore,
        parentStore: undefined
      };

      return <WrappedComponent {...props} />;
    }
  }

  return BaseField(FormobxMeta);
}
