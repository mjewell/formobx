import { ObjectStore } from '../stores';
import { IContext } from '../types';
import { IFieldProps } from './field';
import { WrapperField } from './wrapperField';
export declare class ObjectField extends WrapperField<{}> {
    protected store: ObjectStore;
    constructor(props: IFieldProps, context: IContext);
}
