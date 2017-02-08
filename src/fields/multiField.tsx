import { FieldStore } from '../stores';
import { IChildFieldOldRequiredProps } from './childField';
import { Component, ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IMultiFieldStores {
  [name: string]: FieldStore;
}

export interface IMultiFieldNewRequiredProps {
  names: string[];
}

export interface IMultiFieldOldRequiredProps {
  stores: IMultiFieldStores;
}

export function MultiField<Props>(
  WrappedComponent: (
    ComponentClass<Props & IMultiFieldOldRequiredProps> |
    StatelessComponent<Props & IMultiFieldOldRequiredProps>
  )
): ComponentClass<Props & IMultiFieldNewRequiredProps & IChildFieldOldRequiredProps> {
  return class extends Component<Props & IMultiFieldNewRequiredProps & IChildFieldOldRequiredProps, {}> {
    protected stores: IMultiFieldStores = {};

    constructor(props: Props & IMultiFieldNewRequiredProps & IChildFieldOldRequiredProps) {
      super(props);

      this.props.names.forEach(name => {
        const field = new FieldStore();
        this.stores[name] = field;
        this.props.fields.push({ name, field });
      });
    }

    public render() {
      return (
        <WrappedComponent
          {...this.props}
          stores={this.stores}
        />
      );
    }
  };
}
