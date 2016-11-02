import { FormStore, IFormStoreOptions } from './stores';
import { IMap, IStringMap } from './types';
import * as React from 'react';
export interface IOnSubmit {
    (field: IStringMap): any;
}
export interface IWrappedOnSubmit {
    (e: React.FormEvent<any>): void;
}
export interface IWrappedFormProps {
    form: FormStore;
    onSubmit: IWrappedOnSubmit;
}
export interface IFormobxOptions extends IFormStoreOptions {
    onSubmit: IOnSubmit;
    initialValues?: IMap;
}
export interface IForm<Props> extends React.ComponentClass<Props> {
}
export declare function formobx<Props>(component: React.ComponentClass<Props & IWrappedFormProps>, options: IFormobxOptions): IForm<Props>;
