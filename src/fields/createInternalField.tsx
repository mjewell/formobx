import { ParentStore } from '../stores';
import { ReactComponent } from '../types';
import { IChildFieldParamProps } from './childField';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IInternalFieldResultProps {
  name: string;
}

export interface IInternalFieldParamProps {
  __formobx: {
    store: ParentStore;
  };
}

export function createInternalField(StoreClass: new () => ParentStore) {
  return function InternalField<Props>(
    WrappedComponent: ReactComponent<Props & IInternalFieldParamProps>
  ): ComponentClass<Props & IChildFieldParamProps & IInternalFieldResultProps> {
    return class extends Component<Props & IChildFieldParamProps & IInternalFieldResultProps, {}> {
      private store: ParentStore;

      constructor(props: Props & IChildFieldParamProps & IInternalFieldResultProps) {
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
