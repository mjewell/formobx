import { FieldStore } from '../stores';
import { IContext } from '../types';
import { IChildFieldOldRequiredProps } from './childField';
import { Component, ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IFieldNewRequiredProps {
  name: string;
}

export interface IFieldOldRequiredProps {
  store: FieldStore;
}

export function Field<Props>(
  WrappedComponent: (
    ComponentClass<Props & IFieldOldRequiredProps> |
    StatelessComponent<Props & IFieldOldRequiredProps>
  )
): ComponentClass<Props & IFieldNewRequiredProps & IChildFieldOldRequiredProps> {
  return class extends Component<Props & IFieldNewRequiredProps & IChildFieldOldRequiredProps, {}> {
    public store: FieldStore;

    constructor(props: Props & IFieldNewRequiredProps & IChildFieldOldRequiredProps, context: IContext) {
      super(props, context);

      this.store = new FieldStore();
      this.props.fields.push({
        field: this.store,
        name: this.props.name
      });
    }

    public render() {
      return (
        <WrappedComponent
          {...this.props}
          store={this.store}
        />
      );
    }
  };
}

