import { ArrayStore } from './arrayStore';
import { FieldStore } from './fieldStore';
import { FormStore } from './formStore';
import { ObjectStore } from './objectStore';
export declare type NodeStore = ObjectStore | ArrayStore;
export declare type ChildStore = FieldStore | NodeStore;
export declare type ParentStore = NodeStore | FormStore;
export declare type Store = ChildStore | ParentStore;
