import { ParentStore } from '../stores';
import { IContext } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass, PropTypes, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedMetaProps {
  field: ParentStore;
}

// TODO: create component for meta and form that they can extend and remove everything except render from here
export function meta<Props>(
  MetaComponent: (
    ComponentClass<Props & IWrappedMetaProps> |
    StatelessComponent<Props & IWrappedMetaProps>
  )
): ComponentClass<Props> {
  const WrappedComponent = observer(MetaComponent as ComponentClass<Props & IWrappedMetaProps>);

  class FormobxMeta extends Component<Props, {}> {
    public static contextTypes = {
      parentStore: PropTypes.object.isRequired
    };
    public context: IContext;

    constructor(props: Props, context: IContext) {
      super(props, context);

      if (!context.parentStore) {
        throw new Error('Formobx Fields must be used inside a component decorated with formobx');
      }
    }

    public render() {
      return <WrappedComponent {...this.props} field={this.context.parentStore} />;
    }
  }

  return FormobxMeta;
}
