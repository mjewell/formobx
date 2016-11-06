import { ParentStore } from '../stores';
import { IContext } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass, PropTypes, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedMetaProps {
  field: ParentStore;
}

export function meta<Props>(
  WrappedComponent: ComponentClass<Props & IWrappedMetaProps> | StatelessComponent<Props & IWrappedMetaProps>
): ComponentClass<Props> {
  const WC = observer(WrappedComponent as ComponentClass<Props & IWrappedMetaProps>);

  class Meta extends Component<Props, {}> {
    public static contextTypes = {
      parentStore: PropTypes.object.isRequired
    };
    public context: IContext;

    constructor(props: Props, context: IContext) {
      super(props, context);

      if (!context.parentStore) {
        throw new Error('Metas must be used inside a component decorated with formobx');
      }
    }

    public render() {
      return <WC {...this.props} field={this.context.parentStore} />;
    }
  }

  return Meta;
}
