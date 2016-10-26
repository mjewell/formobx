import { Field, IFieldContext, IFieldProps } from '../components/field';
export declare function createFieldWrapper<IProps>(): new (props: IProps & IFieldProps<IProps>, context: IFieldContext) => Field<IProps>;
