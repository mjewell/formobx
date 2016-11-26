import { ObjectStore } from '../stores';
import { IContext } from '../types';
import { IFieldProps } from './field';
import { WrapperField } from './wrapperField';

export class ObjectField extends WrapperField<{}> {
  protected store: ObjectStore;

  constructor(props: IFieldProps, context: IContext) {
    super(props, context);
    this.store = new ObjectStore();
    this.fields.push({
      field: this.store,
      name: this.props.name
    });
  }
}
