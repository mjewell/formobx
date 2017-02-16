import { ArrayStore, ChildStore, ObjectStore } from '../stores';
import { IMap } from '../types';
const isArray = require('lodash/isArray');
const isPlainObject = require('lodash/isPlainObject');

function handleArrayValue(field: ArrayStore, value: any | any[] | IMap) {
  if (value && !isArray(value)) {
    throw new Error('Expected initialValues for array field to be an array');
  }
  field.setInitialValues(value as any[]);
}

function handleObjectValue(field: ObjectStore, value: any | any[] | IMap) {
  if (value && !isPlainObject(value)) {
    throw new Error('Expected initialValues for object field to be an object');
  }
  field.setInitialValues(value as IMap);
}

export default function setInitialValuesFor(field: ChildStore, value: any | any[] | IMap) {
  if (field instanceof ArrayStore) {
    handleArrayValue(field, value);
  } else if (field instanceof ObjectStore) {
    handleObjectValue(field, value);
  } else {
    field.setInitialValues(value as any);
  }
};
