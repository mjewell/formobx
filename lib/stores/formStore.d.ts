import { IMap } from '../types';
import { ObjectStore } from './objectStore';
export interface IFormStoreOptions {
    initialValues?: IMap;
}
export declare class FormStore extends ObjectStore {
    submitting: boolean;
    constructor(options: IFormStoreOptions);
    setSubmitting(submitting: boolean): void;
}
