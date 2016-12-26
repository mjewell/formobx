import { ArrayStore, ChildStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';

export interface IFieldData {
  name?: string;
  field: ChildStore;
}

export abstract class ChildField<Props> extends React.Component<Props, {}> {
  public static contextTypes = {
    parentStore: React.PropTypes.object.isRequired
  };
  public context: IContext;
  protected fields: IFieldData[] = [];

  constructor(props: Props, context: IContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('Formobx Fields must be used inside a Formobx form');
    }
  }

  public componentDidMount() {
    const parentStore = this.context.parentStore;
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
    const parentStore = this.context.parentStore;
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

  public abstract render(): JSX.Element;
}
