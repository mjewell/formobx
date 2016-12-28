export * from './errors';
export * from './context';

export interface IStringMap {
  [s: string]: string | IStringMap;
}

export interface IMap {
  [s: string]: any;
}
