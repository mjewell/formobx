import { FormobxLeafStore } from './formobxLeafStore';
import { FormobxRootStore } from './formobxRootStore';
import { IMap } from './types';
import { IObservableArray, ObservableMap } from 'mobx';
export declare type ChildStore = FormobxLeafStore | FormobxNodeStore;
export declare type ParentStore = FormobxNodeStore | FormobxRootStore;
export declare class FormobxNodeStore {
    parent: ParentStore;
    fields: ObservableMap<ChildStore>;
    errors: IObservableArray<string>;
    protected initialValues: IMap;
    constructor();
    readonly value: any;
    registerField(name: string, field: ChildStore): void;
    setInitialValues(initialValues?: any): void;
    clearErrors(): void;
    setErrors(errors: string[]): void;
    setAllErrors(errors: {
        [s: string]: string[] | undefined;
        _base?: string[];
    }): void;
}
