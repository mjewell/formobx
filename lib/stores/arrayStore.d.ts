import { IArrayErrors } from '../types';
import { ChildStore, ParentStore } from './types';
import { IObservableArray } from 'mobx';
export declare class ArrayStore {
    parent: ParentStore;
    fields: IObservableArray<ChildStore>;
    errors: IObservableArray<string>;
    protected initialValues: any[];
    constructor();
    readonly value: any;
    registerField(field: ChildStore): void;
    setInitialValues(initialValues?: any): void;
    clearErrors(): void;
    setErrors(errors: IArrayErrors): void;
}
