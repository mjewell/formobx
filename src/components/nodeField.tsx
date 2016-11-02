import { ArrayStore, ObjectStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';

export interface INodeFieldProps {
  name?: string;
}

export abstract class NodeField extends React.Component<INodeFieldProps, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public static childContextTypes = {
    parentStore: React.PropTypes.object
  };
  public context: IContext;
  protected store: ArrayStore | ObjectStore;

  constructor(props: INodeFieldProps, context: IContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('Node Fields must be used inside a component decorated with formobx');
    }
  }

  public getChildContext() {
    return { parentStore: this.store };
  }

  public componentDidMount() {
    const parentStore = this.context.parentStore;
    if (parentStore instanceof ArrayStore) {
      parentStore.registerField(this.store);
    } else {
      if (!this.props.name) {
        throw new Error('Name is required when the parent is not an ArrayField');
      }
      parentStore.registerField(this.props.name, this.store);
    }
  }

  public componentWillUnmount() {
    const parentStore = this.context.parentStore;
    if (parentStore instanceof ArrayStore) {
      parentStore.unregisterField(this.store);
    } else {
      if (!this.props.name) {
        throw new Error('Name is required when the parent is not an ArrayField');
      }
      parentStore.unregisterField(this.props.name);
    }
  }

  public render() {
    return <div>{this.props.children}</div>;
  }
}
