import { FormobxNodeStore } from './formobxNodeStore';
import { IMap } from './types';
export interface IStoreOptions {
    initialValues?: IMap;
}
export declare class FormobxRootStore extends FormobxNodeStore {
    submitting: boolean;
    constructor(options: IStoreOptions);
    setSubmitting(submitting: boolean): void;
}
