import { ParentStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';

export interface IPassedThroughMetaProps { }

export interface IWrappedMetaProps extends IPassedThroughMetaProps {
  field: ParentStore;
}

export interface IMetaComponent<Props> extends React.ComponentClass<Props & IPassedThroughMetaProps> { }

export function meta<Props>(
  Component: React.ComponentClass<Props & IWrappedMetaProps>
): IMetaComponent<Props & IPassedThroughMetaProps> {
  return class Meta extends React.Component<Props & IPassedThroughMetaProps, {}> {
    public static contextTypes = {
      parentStore: React.PropTypes.object.isRequired
    };
    public context: IContext;

    constructor(props: Props & IPassedThroughMetaProps, context: IContext) {
      super(props, context);

      if (!context.parentStore) {
        throw new Error('Metas must be used inside a component decorated with formobx');
      }
    }

    public render() {
      return <Component {...this.props} field={this.context.parentStore} />;
    }
  };
}
