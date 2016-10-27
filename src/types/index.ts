export interface IStringMap {
  [s: string]: string;
}

export interface IMap {
  [s: string]: any;
}

export interface IFormobxErrors {
  _base: string[];
  [name: string]: string[] | IFormobxErrors;
}
