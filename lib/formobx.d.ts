import { FormobxRootStore, IStoreOptions } from './formobxRootStore';
import { IMap } from './types';
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
    form: FormobxRootStore;
    onSubmit: IWrappedOnSubmit;
}
export interface IFormobxOptions extends IStoreOptions {
    onSubmit: IOnSubmit;
    initialValues?: IMap;
}
export interface IForm<Props> extends React.ComponentClass<Props> {
}
export declare function formobx<Props>(component: React.ComponentClass<Props & IWrappedFormProps>, options: IFormobxOptions): IForm<Props>;
