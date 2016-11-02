export type IErrorValues = string[] | IErrors;

export interface IObjectErrors {
  _base: string[];
  [name: string]: IErrorValues;
}

export interface IArrayErrors extends Array<IErrorValues> {
  _base: string[];
  [index: number]: IErrorValues;
}

export type IErrors = IObjectErrors | IArrayErrors;

export function isObjectErrors(errors: IErrorValues): errors is IObjectErrors {
  return <IObjectErrors>errors !== undefined;
}

export function isArrayErrors(errors: IErrorValues): errors is IArrayErrors {
  return <IArrayErrors>errors !== undefined;
}

export function isFieldErrors(errors: IErrorValues): errors is string[] {
  return <string[]>errors !== undefined;
}
