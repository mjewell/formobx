import { FormobxLeafStore } from '../../formobxLeafStore';
import { ParentStore } from '../../formobxNodeStore';
import * as React from 'react';
const omit = require('lodash/fp/omit');

const exceptComponent = omit('component');

export interface IMultiFieldPassedThroughProps {
  names: string[];
}

export interface IMultiFieldStores {
  [name: string]: FormobxLeafStore;
}

export interface IMultiFieldWrappedFieldProps extends IMultiFieldPassedThroughProps {
  fields: IMultiFieldStores;
}

export interface IMultiFieldProps<Props> extends IMultiFieldPassedThroughProps {
  component: React.ComponentClass<Props & IMultiFieldWrappedFieldProps>;
}

export interface IMultiFieldContext {
  parentStore: ParentStore;
}

export class MultiField<Props> extends React.Component<Props & IMultiFieldProps<Props>, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public context: IMultiFieldContext;
  private stores: IMultiFieldStores;
  private component: React.ComponentClass<Props & IMultiFieldWrappedFieldProps>;

  constructor(props: Props & IMultiFieldProps<Props>, context: IMultiFieldContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('MultiFields must be used inside a component decorated with formobx');
    }

    this.stores = {};
    this.props.names.forEach(name => {
      this.stores[name] = new FormobxLeafStore();
    });
    this.component = props.component;
  }

  public componentDidMount() {
    this.props.names.forEach(name => {
      this.context.parentStore.registerField(
        name,
        this.stores[name]
      );
    });
  }

  public render() {
    return (
      <this.component
        {...exceptComponent(this.props) }
        fields={this.stores}
        />
    );
  }
}
