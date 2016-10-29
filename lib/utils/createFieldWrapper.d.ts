import { Field, IFieldProps } from '../components/field';
import { IContext } from '../types';
export declare function createFieldWrapper<IProps>(): new (props: IProps & IFieldProps<IProps>, context: IContext) => Field<IProps>;
