import { IMap, IObjectErrors } from '../types';
import { ChildStore, ParentStore } from './types';
import { IObservableArray, ObservableMap } from 'mobx';
export declare class ObjectStore {
    parent: ParentStore;
    fields: ObservableMap<ChildStore>;
    errors: IObservableArray<string>;
    protected initialValues: IMap;
    constructor();
    readonly value: any;
    registerField(name: string, field: ChildStore): void;
    setInitialValues(initialValues?: any): void;
    clearErrors(): void;
    setErrors(errors: IObjectErrors): void;
}
