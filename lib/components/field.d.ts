import { ChildField } from '../components/childField';
import { FieldStore } from '../stores';
import { IContext } from '../types';
export interface IFieldProps {
    name?: string;
}
export declare abstract class Field<Props> extends ChildField<Props & IFieldProps> {
    protected store: FieldStore;
    constructor(props: Props & IFieldProps, context: IContext);
}
