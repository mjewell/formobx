import { ArrayStore, FieldStore } from '../stores';
import { IContext } from '../types';
import { observer } from 'mobx-react';
import { Component, ComponentClass, PropTypes, StatelessComponent } from 'react';
import * as React from 'react';

export interface IPassedThroughFieldProps {
  name?: string;
}

export interface IWrappedFieldProps extends IPassedThroughFieldProps {
  field: FieldStore;
}

// TODO: add prepublish build script

export function field<Props>(
  WrappedComponent: ComponentClass<Props & IWrappedFieldProps> | StatelessComponent<Props & IWrappedFieldProps> | string
): ComponentClass<Props & IPassedThroughFieldProps> {
  const WC = typeof WrappedComponent === 'string' ? undefined : observer(WrappedComponent as ComponentClass<Props & IWrappedFieldProps>);

  class Field extends Component<Props & IPassedThroughFieldProps, {}> {
    public static contextTypes = {
      parentStore: PropTypes.object.isRequired
    };
    public context: IContext;
    private store: FieldStore;

    constructor(props: Props & IPassedThroughFieldProps, context: IContext) {
      super(props, context);

      if (!context.parentStore) {
        throw new Error('Fields must be used inside a component decorated with formobx');
      }

      this.store = new FieldStore();
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
      // TODO: handle other string types
      if (typeof WrappedComponent === 'string') {
        if (WrappedComponent === 'input') {
          return <input {...this.props} {...this.store.asProps} />;
        }
        throw new Error('Unsupported string component type');
      }

      if (WC) {
        return <WC {...this.props} field={this.store} />;
      } else {
        throw new Error('Somehow the component was not wrapped but was also not a string...');
      }
    }
  }

  return Field;
}
