import { IMap, IObjectErrors } from '../types';
import { ChildStore, ParentStore } from './types';
import { IObservableArray, ObservableMap } from 'mobx';
export declare class ObjectStore {
    parent: ParentStore;
    fields: ObservableMap<ChildStore>;
    errors: IObservableArray<string>;
    protected initialValues: IMap;
    readonly value: IMap;
    registerField(name: string, field: ChildStore): void;
    unregisterField(name: string): void;
    setInitialValues(initialValues?: IMap): void;
    clearErrors(): void;
    setErrors(errors: IObjectErrors): void;
}
