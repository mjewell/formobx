import { ArrayStore, ChildStore, ObjectStore } from '../stores';
import { IMap } from '../types';

export default function setInitialValuesFor(field: ChildStore, value: any | any[] | IMap) {
  if (field instanceof ArrayStore) {
    field.setInitialValues(value as any[]);
  } else if (field instanceof ObjectStore) {
    field.setInitialValues(value as IMap);
  } else {
    field.setInitialValues(value as any);
  }
};
