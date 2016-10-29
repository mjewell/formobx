import { ArrayStore } from './arrayStore';
import { FieldStore } from './fieldStore';
import { FormStore } from './formStore';
import { ObjectStore } from './objectStore';

export type NodeStore = ObjectStore | ArrayStore;
export type ChildStore = FieldStore | NodeStore;
export type ParentStore = NodeStore | FormStore;
export type Store = ChildStore | ParentStore;
