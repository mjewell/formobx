export declare type IFieldErrors = string[];
export interface IObjectErrors {
    _base: IFieldErrors;
    [name: string]: IErrorValues;
}
export interface IArrayErrors extends Array<IErrorValues> {
    _base: IFieldErrors;
    [index: number]: IErrorValues;
}
export declare type IErrors = IObjectErrors | IArrayErrors;
export declare type IErrorValues = IFieldErrors | IErrors;
export declare function isObjectErrors(errors: IErrorValues): errors is IObjectErrors;
export declare function isArrayErrors(errors: IErrorValues): errors is IArrayErrors;
export declare function isFieldErrors(errors: IErrorValues): errors is IFieldErrors;
