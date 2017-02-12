import { ParentStore } from '../stores';
import { ReactComponent } from '../types';
import { IWithStoreParamProps } from './creators/createWithStore';
import { Component, ComponentClass, PropTypes } from 'react';
import * as React from 'react';

export function withParentStoreInContext<Props, Store extends ParentStore>(
  WrappedComponent: ReactComponent<Props>
): ComponentClass<Props & IWithStoreParamProps<Store>> {
  return class extends Component<Props & IWithStoreParamProps<Store>, {}> {
    public static childContextTypes = {
      parentStore: PropTypes.object
    };

    public getChildContext() {
      return { parentStore: this.props.__formobx.store };
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
