import { ArrayStore, FieldStore } from '../../stores';
import { IContext } from '../../types';
import * as React from 'react';
const omit = require('lodash/fp/omit');

const exceptComponent = omit('component');

export interface IFieldPassedThroughProps {
  name?: string;
}

export interface IFieldWrappedFieldProps extends IFieldPassedThroughProps {
  field: FieldStore;
}

export interface IFieldProps<Props> extends IFieldPassedThroughProps {
  component: React.ComponentClass<Props & IFieldWrappedFieldProps>;
}

export class Field<Props> extends React.Component<Props & IFieldProps<Props>, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public context: IContext;
  private store: FieldStore;
  private component: React.ComponentClass<Props & IFieldWrappedFieldProps>;

  constructor(props: Props & IFieldProps<Props>, context: IContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('Fields must be used inside a component decorated with formobx');
    }

    this.store = new FieldStore();
    this.component = props.component;
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
    return (
      <this.component
        {...exceptComponent(this.props) }
        field={this.store}
        />
    );
  }
}
