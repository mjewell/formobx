import { Field, IFieldProps } from '../components/field';
import { IContext } from '../types';

export function createFieldWrapper<IProps>() {
  return Field as new (
    props: IProps & IFieldProps<IProps>,
    context: IContext
  ) => Field<IProps>;
};
