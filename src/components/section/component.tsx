import { FormobxNodeStore, ParentStore } from '../../formobxNodeStore';
import * as React from 'react';

export interface IProps {
  name: string;
}

export interface ISectionContext {
  parentStore: ParentStore;
}

export class Section extends React.Component<IProps, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public static childContextTypes = {
    parentStore: React.PropTypes.object
  };
  public context: ISectionContext;
  private store: FormobxNodeStore;

  constructor(props: IProps, context: ISectionContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('Sections must be used inside a component decorated with formobx');
    }

    this.store = new FormobxNodeStore();
  }

  public getChildContext() {
    return { parentStore: this.store };
  }

  public componentDidMount() {
    this.context.parentStore.registerField(
      this.props.name,
      this.store
    );
  }

  public render() {
    return <div>{this.props.children}</div>;
  }
}
