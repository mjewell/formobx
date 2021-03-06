import { ParentStore } from '../stores';
import { IContext, ReactComponent } from '../types';
import { Component, ComponentClass, PropTypes } from 'react';
import * as React from 'react';

export type IWithParentStoreParamProps = {
  __formobx: {
    parentStore: ParentStore;
  };
}

export function withParentStore<Props>(
  WrappedComponent: ReactComponent<Props & IWithParentStoreParamProps>
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
          __formobx={{ parentStore: this.context.parentStore }}
        />
      );
    }
  };
}
