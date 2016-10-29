import { ArrayStore, FieldStore } from '../../stores';
import { IContext } from '../../types';
import * as React from 'react';
const omit = require('lodash/fp/omit');

const exceptComponent = omit('component');

export interface IMultiFieldPassedThroughProps {
  names?: string[];
}

export interface IMultiFieldStores {
  [name: string]: FieldStore;
}

export interface IMultiFieldWrappedFieldProps extends IMultiFieldPassedThroughProps {
  fields: IMultiFieldStores;
}

export interface IMultiFieldProps<Props> extends IMultiFieldPassedThroughProps {
  component: React.ComponentClass<Props & IMultiFieldWrappedFieldProps>;
}

export class MultiField<Props> extends React.Component<Props & IMultiFieldProps<Props>, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public context: IContext;
  private stores: IMultiFieldStores;
  private component: React.ComponentClass<Props & IMultiFieldWrappedFieldProps>;

  constructor(props: Props & IMultiFieldProps<Props>, context: IContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('MultiFields must be used inside a component decorated with formobx');
    }

    this.stores = {};
    // TODO: Fix this
    (this.props.names || []).forEach(name => {
      this.stores[name] = new FieldStore();
    });
    this.component = props.component;
  }

  public componentDidMount() {
    const store = this.context.parentStore;
    if (store instanceof ArrayStore) {
      (this.props.names || []).forEach(name => {
        store.registerField(this.stores[name]);
      });
    } else {
      if (!this.props.names) {
        throw new Error('Names are required when the parent is not an ArrayField');
      }
      this.props.names.forEach(name => {
        store.registerField(name, this.stores[name]);
      });
    }
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
