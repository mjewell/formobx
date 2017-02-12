import { IFieldData, IWithFieldsRegisteredParamProps, IWithParentStoreParamProps } from '..';
import { ChildStore } from '../../stores';
import { ReactComponent } from '../../types';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export type IWithStoreParamProps<Store> = {
  __formobx: {
    store: Store;
  };
};

export type IWithStoreResultProps = {
  name: string;
} & IWithFieldsRegisteredParamProps;

export function createWithStore<Store extends ChildStore>(StoreClass: new () => Store) {
  return function withStore<Props>(
    WrappedComponent: ReactComponent<Props & IWithStoreParamProps<Store>>
  ): ComponentClass<Props & IWithStoreResultProps> {
    return class extends Component<Props & IWithStoreResultProps, {}> {
      private store: Store;

      constructor(props: Props & IWithStoreResultProps) {
        super(props);

        this.store = new StoreClass();
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
  };
}
