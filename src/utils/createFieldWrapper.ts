import { Field, IFieldContext, IFieldProps } from '../components/field/component';

export function createFieldWrapper<IProps>() {
  return Field as new (
    props: IProps & IFieldProps<IProps>,
    context: IFieldContext
  ) => Field<IProps>;
};
