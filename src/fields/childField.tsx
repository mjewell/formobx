import { ArrayStore, ChildStore } from '../stores';
import { ReactComponent } from '../types';
import { IBaseFieldParamProps } from './baseField';
import { Component, ComponentClass } from 'react';
import * as React from 'react';

export interface IFieldData {
  name?: string;
  field: ChildStore;
}

export interface IChildFieldParamProps {
  __formobx: {
    fields: IFieldData[];
  };
}

export function ChildField<Props>(
  WrappedComponent: ReactComponent<Props & IChildFieldParamProps>
): ComponentClass<Props & IBaseFieldParamProps> {
  return class extends Component<Props & IBaseFieldParamProps, {}> {
    private fields: IFieldData[] = [];

    public componentDidMount() {
      const { parentStore } = this.props.__formobx;
      if (parentStore instanceof ArrayStore) {
        this.fields.forEach(data => {
          parentStore.registerField(data.field);
        });
      } else {
        if (this.fields.length === 0 || this.fields.some(data => !data.name)) {
          throw new Error('All fields must have names when the parent is not an ArrayField');
        }
        this.fields.forEach(data => {
          parentStore.registerField(
            data.name as string, // presence is guaranteed by above check
            data.field
          );
        });
      }
    }

    public componentWillUnmount() {
      const { parentStore } = this.props.__formobx;
      if (parentStore instanceof ArrayStore) {
        this.fields.forEach(data => {
          parentStore.unregisterField(data.field);
        });
      } else {
        if (this.fields.length === 0) {
          throw new Error('Names are required when the parent is not an ArrayField');
        }
        this.fields.forEach(data => {
          parentStore.unregisterField(
            data.name as string // presence is guaranteed by above check
          );
        });
      }
    }

    public render() {
      const formobxProps = {
        ...this.props.__formobx,
        fields: this.fields
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
