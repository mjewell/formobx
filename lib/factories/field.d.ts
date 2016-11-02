import { FieldStore } from '../stores';
import * as React from 'react';
export interface IPassedThroughFieldProps {
    name?: string;
}
export interface IWrappedFieldProps extends IPassedThroughFieldProps {
    field: FieldStore;
}
export interface IFieldComponent<Props> extends React.ComponentClass<Props & IPassedThroughFieldProps> {
}
export declare function field<Props>(Component: React.ComponentClass<Props & IWrappedFieldProps> | string): IFieldComponent<Props & IPassedThroughFieldProps>;
