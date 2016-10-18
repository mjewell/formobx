import { Field, IFieldContext, IFieldProps } from '../components/field/component';
export declare function createFieldWrapper<IProps>(): new (props: IProps & IFieldProps<IProps>, context: IFieldContext) => Field<IProps>;
