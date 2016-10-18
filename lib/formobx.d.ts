import { IStoreOptions, Store } from './store';
import * as React from 'react';
export interface IOnSubmit {
    (field: {
        [s: string]: string;
    }): any;
}
export interface IWrappedOnSubmit {
    (e: React.FormEvent<any>): void;
}
export interface IWrappedFormProps {
    form: Store;
    onSubmit: IWrappedOnSubmit;
}
export interface IFormobxOptions extends IStoreOptions {
    onSubmit: IOnSubmit;
}
export interface IForm<Props> extends React.ComponentClass<Props> {
}
export declare function formobx<Props>(component: React.ComponentClass<Props & IWrappedFormProps>, options: IFormobxOptions): IForm<Props>;
