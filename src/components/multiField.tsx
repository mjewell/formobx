import { ChildField } from '../components/childField';
import { FieldStore } from '../stores';
import { IContext } from '../types';

export interface IMultiFieldProps {
  names?: string[];
}

export interface IMultiFieldStores {
  [name: string]: FieldStore;
}

export abstract class MultiField<Props> extends ChildField<Props & IMultiFieldProps> {
  protected stores: IMultiFieldStores = {};

  constructor(props: Props & IMultiFieldProps, context: IContext) {
    super(props, context);

    (this.props.names || []).forEach(name => {
      const field = new FieldStore();
      this.stores[name] = field;
      this.fields.push({ name, field });
    });
  }
}
