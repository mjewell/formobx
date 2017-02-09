import { FieldStore } from '../stores';
import { ReactComponent } from '../types';
import { IChildFieldParamProps } from './childField';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IMultiFieldStores {
  [name: string]: FieldStore;
}

export interface IMultiFieldResultProps {
  names: string[];
}

export interface IMultiFieldParamProps {
  __formobx: {
    stores: IMultiFieldStores;
  };
}

export function MultiField<Props>(
  WrappedComponent: ReactComponent<Props & IMultiFieldParamProps>
): ComponentClass<Props & IChildFieldParamProps & IMultiFieldResultProps> {
  return class extends Component<Props & IChildFieldParamProps & IMultiFieldResultProps, {}> {
    private stores: IMultiFieldStores = {};

    constructor(props: Props & IChildFieldParamProps & IMultiFieldResultProps) {
      super(props);

      this.props.names.forEach(name => {
        const field = new FieldStore();
        this.stores[name] = field;
        const { fields } = this.props.__formobx;
        fields.push({ name, field });
      });
    }

    public render() {
      const formobxProps = {
        ...this.props.__formobx,
        stores: this.stores
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
