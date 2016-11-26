export type IFieldErrors = string[];

export interface IObjectErrors {
  _base: IFieldErrors;
  [name: string]: IErrorValues;
}

export interface IArrayErrors extends Array<IErrorValues> {
  _base: IFieldErrors;
  [index: number]: IErrorValues;
}

export type IErrors = IObjectErrors | IArrayErrors;

export type IErrorValues = IFieldErrors | IErrors;

export function isObjectErrors(errors: IErrorValues): errors is IObjectErrors {
  return <IObjectErrors>errors !== undefined;
}

export function isArrayErrors(errors: IErrorValues): errors is IArrayErrors {
  return <IArrayErrors>errors !== undefined;
}

export function isFieldErrors(errors: IErrorValues): errors is IFieldErrors {
  return <IFieldErrors>errors !== undefined;
}
