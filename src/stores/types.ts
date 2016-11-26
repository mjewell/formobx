import { ArrayStore } from './arrayStore';
import { FieldStore } from './fieldStore';
import { ObjectStore } from './objectStore';

export type ParentStore = ObjectStore | ArrayStore;
export type ChildStore = FieldStore | ParentStore;
