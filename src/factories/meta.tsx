import { BaseField } from '../fields';
import { ParentStore } from '../stores';
import { observer } from 'mobx-react';
import { ComponentClass, StatelessComponent } from 'react';
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

  return class FormobxMeta extends BaseField<Props> {
    public render() {
      return <WrappedComponent {...this.props} field={this.context.parentStore} />;
    }
  };
}
