import { IFieldData } from '.';
import { FieldStore } from '../stores';
import { ReactComponent } from '../types';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IStoresMap {
  [name: string]: FieldStore;
}

export type IWithStoresParamProps = {
  __formobx: {
    stores: IStoresMap;
  };
};

// this nested type has to be separated out for typescript to merge props correctly
export type IWithStoresResultFormobxProps = {
  __formobx: {
    fields: IFieldData[];
  };
};

export type IWithStoresResultProps = {
  names?: string[];
} & IWithStoresResultFormobxProps;

// TODO: merge this with createWithStores
export function withStores<Props>(
  WrappedComponent: ReactComponent<Props & IWithStoresParamProps>
): ComponentClass<Props & IWithStoresResultProps> {
  return class extends Component<Props & IWithStoresResultProps, {}> {
    private stores: IStoresMap = {};

    constructor(props: Props & IWithStoresResultProps) {
      super(props);

      (this.props.names || []).forEach(name => {
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
