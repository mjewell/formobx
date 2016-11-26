import { ArrayStore } from './arrayStore';
import { FieldStore } from './fieldStore';
import { ObjectStore } from './objectStore';
export declare type ParentStore = ObjectStore | ArrayStore;
export declare type ChildStore = FieldStore | ParentStore;
