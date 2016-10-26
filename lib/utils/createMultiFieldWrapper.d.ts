import { IMultiFieldContext, IMultiFieldProps, MultiField } from '../components/multiField';
export declare function createMultiFieldWrapper<IProps>(): new (props: IProps & IMultiFieldProps<IProps>, context: IMultiFieldContext) => MultiField<IProps>;
