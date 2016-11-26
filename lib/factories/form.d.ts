import { FormStore, IFormStoreOptions } from '../stores';
import { IMap, IStringMap } from '../types';
import { ComponentClass, FormEvent, StatelessComponent } from 'react';
export interface IOnSubmit {
    (form: IStringMap, ...otherArgs: any[]): any;
}
export interface IWrappedOnSubmit {
    (e: FormEvent<any>, ...otherArgs: any[]): void;
}
export interface IWrappedFormProps {
    form: FormStore;
    onSubmit: IWrappedOnSubmit;
}
export interface IFormOptions extends IFormStoreOptions {
    onSubmit: IOnSubmit;
    initialValues?: IMap;
}
export declare function form<Props>(options: IFormOptions): (FormComponent: ComponentClass<Props & IWrappedFormProps> | StatelessComponent<Props & IWrappedFormProps>) => ComponentClass<Props>;
