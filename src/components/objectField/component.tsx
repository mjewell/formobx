import { ArrayStore, ObjectStore } from '../../stores';
import { IContext } from '../../types';
import * as React from 'react';

export interface IObjectFieldProps {
  name?: string;
}

export class ObjectField extends React.Component<IObjectFieldProps, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public static childContextTypes = {
    parentStore: React.PropTypes.object
  };
  public context: IContext;
  private store: ObjectStore;

  constructor(props: IObjectFieldProps, context: IContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('ObjectFields must be used inside a component decorated with formobx');
    }

    this.store = new ObjectStore();
  }

  public getChildContext() {
    return { parentStore: this.store };
  }

  public componentDidMount() {
    const store = this.context.parentStore;
    if (store instanceof ArrayStore) {
      store.registerField(this.store);
    } else {
      if (!this.props.name) {
        throw new Error('Name is required when the parent is not an ArrayField');
      }
      store.registerField(this.props.name, this.store);
    }
  }

  public render() {
    return <div>{this.props.children}</div>;
  }
}
