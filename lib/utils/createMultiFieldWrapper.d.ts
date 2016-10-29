import { IMultiFieldProps, MultiField } from '../components/multiField';
import { IContext } from '../types';
export declare function createMultiFieldWrapper<IProps>(): new (props: IProps & IMultiFieldProps<IProps>, context: IContext) => MultiField<IProps>;
