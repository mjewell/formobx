import { ArrayStore, ChildStore, ObjectStore } from '../stores';
import { IErrorValues, isArrayErrors, isFieldErrors, isObjectErrors } from '../types';

export default function setErrorsFor(field: ChildStore, errors: IErrorValues) {
  if (field) {
    if (field instanceof ArrayStore) {
      if (isArrayErrors(errors)) {
        field.setErrors(errors);
      }
    } else if (field instanceof ObjectStore) {
      if (isObjectErrors(errors)) {
        field.setErrors(errors);
      }
    } else {
      if (isFieldErrors(errors)) {
        field.setErrors(errors);
      }
    }
  }
}
