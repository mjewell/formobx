import { FieldStore } from '../stores';
import * as React from 'react';
export interface IPassedThroughMultiFieldProps {
    names?: string[];
}
export interface IMultiFieldStores {
    [name: string]: FieldStore;
}
export interface IWrappedMultiFieldProps extends IPassedThroughMultiFieldProps {
    fields: IMultiFieldStores;
}
export interface IMultiFieldComponent<Props> extends React.ComponentClass<Props & IPassedThroughMultiFieldProps> {
}
export declare function multiField<Props>(Component: React.ComponentClass<Props & IWrappedMultiFieldProps>): IMultiFieldComponent<Props & IPassedThroughMultiFieldProps>;
