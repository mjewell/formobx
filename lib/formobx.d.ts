import { IStoreOptions } from './store';
import * as React from 'react';
export interface IOnSubmit {
    (field: {
        [s: string]: string;
    }): any;
}
export interface IWrappedOnSubmit {
    (e: React.FormEvent<any>): void;
}
export interface IFormobxProps {
    [prop: string]: any;
}
export interface IFormobxOptions extends IStoreOptions {
    onSubmit: IOnSubmit;
}
export interface IForm extends React.ComponentClass<IFormobxProps> {
}
export declare function formobx(component: React.ComponentClass<any>, options: IFormobxOptions): IForm;
