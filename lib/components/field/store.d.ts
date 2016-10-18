import { IObservableArray } from 'mobx';
import * as React from 'react';
export declare class Store {
    value: any;
    errors: IObservableArray<string>;
    readonly asProps: {
        onChange: (e: React.FormEvent<any>) => void;
        value: any;
    };
    updateValue(val: any): void;
    clearErrors(): void;
    updateErrors(errors: string[]): void;
}
