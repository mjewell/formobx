import { ReactComponent } from '../types';
import { IInternalFieldParamProps } from './createInternalField';
import { Component, ComponentClass, PropTypes } from 'react';
import * as React from 'react';

export function ParentField<Props>(
  WrappedComponent: ReactComponent<Props>
): ComponentClass<Props> {
  return class extends Component<Props & IInternalFieldParamProps, {}> {
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
