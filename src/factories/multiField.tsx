import { ArrayStore, FieldStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';

export interface IPassedThroughMultiFieldProps {
  names?: string[];
}

export interface IMultiFieldStores {
  [name: string]: FieldStore;
}

export interface IWrappedMultiFieldProps extends IPassedThroughMultiFieldProps {
  fields: IMultiFieldStores;
}

export interface IMultiFieldComponent<Props> extends React.ComponentClass<Props & IPassedThroughMultiFieldProps> { }

export function multiField<Props>(
  Component: React.ComponentClass<Props & IWrappedMultiFieldProps>
): IMultiFieldComponent<Props & IPassedThroughMultiFieldProps> {
  return class MultiField extends React.Component<Props & IPassedThroughMultiFieldProps, {}> {
    public static contextTypes = {
      parentStore: React.PropTypes.object.isRequired
    };
    public context: IContext;
    private stores: IMultiFieldStores;

    constructor(props: Props & IPassedThroughMultiFieldProps, context: IContext) {
      super(props, context);

      if (!context.parentStore) {
        throw new Error('MultiFields must be used inside a component decorated with formobx');
      }

      this.stores = {};
      // TODO: Fix this
      (this.props.names || []).forEach(name => {
        this.stores[name] = new FieldStore();
      });
    }

    public componentDidMount() {
      const parentStore = this.context.parentStore;
      if (parentStore instanceof ArrayStore) {
        (this.props.names || []).forEach(name => {
          parentStore.registerField(this.stores[name]);
        });
      } else {
        if (!this.props.names) {
          throw new Error('Names are required when the parent is not an ArrayField');
        }
        this.props.names.forEach(name => {
          parentStore.registerField(name, this.stores[name]);
        });
      }
    }

    public render() {
      return <Component {...this.props} fields={this.stores} />;
    }
  };
}
