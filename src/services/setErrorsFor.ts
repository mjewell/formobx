import { ArrayStore, ChildStore, ObjectStore } from '../stores';
import { IErrorValues, isArrayErrors, isFieldErrors, isObjectErrors } from '../types';

export default function setErrorsFor(field: ChildStore, error: IErrorValues) {
  if (field) {
    if (field instanceof ArrayStore) {
      if (isArrayErrors(error)) {
        field.setErrors(error);
      }
    } else if (field instanceof ObjectStore) {
      if (isObjectErrors(error)) {
        field.setErrors(error);
      }
    } else {
      if (isFieldErrors(error)) {
        field.setErrors(error);
      }
    }
  }
}
