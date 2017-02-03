import { FieldStore } from '../stores';
import { IContext } from '../types';
import { ChildField } from './childField';

export interface IFieldProps {
  name?: string;
}

export abstract class Field<Props> extends ChildField<Props & IFieldProps> {
  public store: FieldStore;

  constructor(props: Props & IFieldProps, context: IContext) {
    super(props, context);

    this.store = new FieldStore();
    this.fields.push({
      field: this.store,
      name: this.props.name
    });
  }
}
