import { ParentStore } from '../stores';
import { ReactComponent } from '../types';
import { Component, ComponentClass, PropTypes } from 'react';
import * as React from 'react';

export type IWithParentStoreInContextResultProps<Store extends ParentStore> = {
  __formobx: {
    store: Store
  };
};

export function withParentStoreInContext<Props, Store extends ParentStore>(
  WrappedComponent: ReactComponent<Props>
): ComponentClass<Props & IWithParentStoreInContextResultProps<Store>> {
  return class extends Component<Props & IWithParentStoreInContextResultProps<Store>, {}> {
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
