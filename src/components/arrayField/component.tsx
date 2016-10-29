import { ArrayStore } from '../../stores';
import { IContext } from '../../types';
import * as React from 'react';

export interface IProps {
  name?: string;
}

export class ArrayField extends React.Component<IProps, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public static childContextTypes = {
    parentStore: React.PropTypes.object
  };
  public context: IContext;
  private store: ArrayStore;

  constructor(props: IProps, context: IContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('ArrayFields must be used inside a component decorated with formobx');
    }

    this.store = new ArrayStore();
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
