import { FieldStore } from '../stores';
import { ReactComponent } from '../types';
import { IChildFieldParamProps } from './childField';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IFieldResultProps {
  name: string;
}

export interface IFieldParamProps {
  __formobx: {
    store: FieldStore;
  };
}

export function Field<Props>(
  WrappedComponent: ReactComponent<Props & IFieldParamProps>
): ComponentClass<Props & IChildFieldParamProps & IFieldResultProps> {
  return class extends Component<Props & IChildFieldParamProps & IFieldResultProps, {}> {
    private store: FieldStore;

    constructor(props: Props & IChildFieldParamProps & IFieldResultProps) {
      super(props);

      this.store = new FieldStore();
      const { fields } = this.props.__formobx;
      fields.push({
        field: this.store,
        name: this.props.name
      });
    }

    public render() {
      const formobxProps = {
        ...this.props.__formobx,
        store: this.store
      };

      return (
        <WrappedComponent
          {...this.props}
          __formobx={formobxProps}
        />
      );
    }
  };
}
