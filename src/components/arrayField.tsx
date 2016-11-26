import { ArrayStore } from '../stores';
import { IContext } from '../types';
import { IFieldProps } from './field';
import { WrapperField } from './wrapperField';

export class ArrayField extends WrapperField<{}> {
  protected store: ArrayStore;

  constructor(props: IFieldProps, context: IContext) {
    super(props, context);
    this.store = new ArrayStore();
    this.fields.push({
      field: this.store,
      name: this.props.name
    });
  }
}
