import { IObservableArray } from 'mobx';
import * as React from 'react';
export default class Store {
    value: string;
    errors: IObservableArray<string>;
    readonly asProps: {
        onChange: (e: React.FormEvent<any>) => void;
        value: string;
    };
    updateValue(val: string): void;
    clearErrors(): void;
    updateErrors(errors: string[]): void;
}
