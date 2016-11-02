/// <reference types="core-js" />
export declare type IErrorValues = string[] | IErrors;
export interface IObjectErrors {
    _base: string[];
    [name: string]: IErrorValues;
}
export interface IArrayErrors extends Array<IErrorValues> {
    _base: string[];
    [index: number]: IErrorValues;
}
export declare type IErrors = IObjectErrors | IArrayErrors;
export declare function isObjectErrors(errors: IErrorValues): errors is IObjectErrors;
export declare function isArrayErrors(errors: IErrorValues): errors is IArrayErrors;
export declare function isFieldErrors(errors: IErrorValues): errors is string[];
