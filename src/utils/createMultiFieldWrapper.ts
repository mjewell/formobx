import { IMultiFieldProps, MultiField } from '../components/multiField';
import { IContext } from '../types';

export function createMultiFieldWrapper<IProps>() {
  return MultiField as new (
    props: IProps & IMultiFieldProps<IProps>,
    context: IContext
  ) => MultiField<IProps>;
};
