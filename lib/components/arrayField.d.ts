import { ArrayStore } from '../stores';
import { IContext } from '../types';
import { IFieldProps } from './field';
import { WrapperField } from './wrapperField';
export declare class ArrayField extends WrapperField<{}> {
    protected store: ArrayStore;
    constructor(props: IFieldProps, context: IContext);
}
