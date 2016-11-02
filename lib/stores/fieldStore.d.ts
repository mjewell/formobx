import { ParentStore } from './types';
import { IObservableArray } from 'mobx';
import * as React from 'react';
export declare class FieldStore {
    parent: ParentStore;
    value: any;
    errors: IObservableArray<string>;
    readonly asProps: {
        onChange: (e: React.FormEvent<any>) => void;
        value: any;
    };
    setInitialValues(initialValue: any): void;
    setValue(val: any): void;
    clearErrors(): void;
    setErrors(errors: string[]): void;
}