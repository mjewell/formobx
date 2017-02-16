export * from './context';
export * from './errors';
export * from './react';

export interface IStringMap {
  [s: string]: string | IStringMap;
}

export interface IMap {
  [s: string]: any;
}
