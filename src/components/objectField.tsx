import { ObjectStore } from '../stores';
import { IContext } from '../types';
import { INodeFieldProps, NodeField } from './nodeField';

export class ObjectField extends NodeField {
  constructor(props: INodeFieldProps, context: IContext) {
    super(props, context);
    this.store = new ObjectStore();
  }
}
