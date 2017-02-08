import { ArrayStore, ChildStore } from '../stores';
import { IBaseFieldOldRequiredProps } from './baseField';
import { Component, ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IFieldData {
  name?: string;
  field: ChildStore;
}

export interface IChildFieldOldRequiredProps {
  fields: IFieldData[];
}

export function ChildField<Props>(
  WrappedComponent: (
    ComponentClass<Props & IChildFieldOldRequiredProps> |
    StatelessComponent<Props & IChildFieldOldRequiredProps>
  )
): ComponentClass<Props & IBaseFieldOldRequiredProps> {
  return class extends Component<Props & IBaseFieldOldRequiredProps, {}> {
    private fields: IFieldData[] = [];

    public componentDidMount() {
      const parentStore = this.props.parentStore;
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
      const parentStore = this.props.parentStore;
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
      return (
        <WrappedComponent
          {...this.props}
          fields={this.fields}
        />
      );
    }
  };
}

