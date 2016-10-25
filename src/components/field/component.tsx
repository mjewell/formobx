import { FormobxLeafStore } from '../../formobxLeafStore';
import { ParentStore } from '../../formobxNodeStore';
import * as React from 'react';
const omit = require('lodash/fp/omit');

const exceptComponent = omit('component');

export interface IPassedThroughProps {
  name: string;
}

export interface IWrappedFieldProps extends IPassedThroughProps {
  field: FormobxLeafStore;
}

export interface IFieldProps<Props> extends IPassedThroughProps {
  component: React.ComponentClass<Props & IWrappedFieldProps>;
}

export interface IFieldContext {
  parentStore: ParentStore;
}

export class Field<Props> extends React.Component<Props & IFieldProps<Props>, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public context: IFieldContext;
  private store: FormobxLeafStore;
  private component: React.ComponentClass<Props & IWrappedFieldProps>;

  constructor(props: Props & IFieldProps<Props>, context: IFieldContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('Fields must be used inside a component decorated with formobx');
    }

    this.store = new FormobxLeafStore();
    this.component = props.component;
  }

  public componentDidMount() {
    this.context.parentStore.registerField(
      this.props.name,
      this.store
    );
  }

  public render() {
    return (
      <this.component
        {...exceptComponent(this.props) }
        field={this.store}
        />
    );
  }
}
