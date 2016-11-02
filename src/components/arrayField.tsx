import { ArrayStore } from '../stores';
import { IContext } from '../types';
import { INodeFieldProps, NodeField } from './nodeField';

export class ArrayField extends NodeField {
  constructor(props: INodeFieldProps, context: IContext) {
    super(props, context);
    this.store = new ArrayStore();
  }
}
