import { IMultiFieldContext, IMultiFieldProps, MultiField } from '../components/multiField';

export function createMultiFieldWrapper<IProps>() {
  return MultiField as new (
    props: IProps & IMultiFieldProps<IProps>,
    context: IMultiFieldContext
  ) => MultiField<IProps>;
};
