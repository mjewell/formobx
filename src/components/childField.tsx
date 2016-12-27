import { ArrayStore, ChildStore } from '../stores';
import { BaseField } from './baseField';

export interface IFieldData {
  name?: string;
  field: ChildStore;
}

export abstract class ChildField<Props> extends BaseField<Props> {
  protected fields: IFieldData[] = [];

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
};
