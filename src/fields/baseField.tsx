import { ParentStore } from '../stores';
import { IContext } from '../types';
import { Component, ComponentClass, PropTypes, StatelessComponent } from 'react';
import * as React from 'react';

export interface IBaseFieldOldRequiredProps {
  parentStore: ParentStore;
}

export function BaseField<Props>(
  WrappedComponent: (
    ComponentClass<Props & IBaseFieldOldRequiredProps> |
    StatelessComponent<Props & IBaseFieldOldRequiredProps>
  )
): ComponentClass<Props> {
  return class extends Component<Props, {}> {
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
      return (
        <WrappedComponent
          {...this.props}
          parentStore={this.context.parentStore}
        />
      );
    }
  };
}
