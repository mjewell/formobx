import { FieldStore } from '../stores';
import { ComponentClass, StatelessComponent } from 'react';
export interface IPassedThroughFieldProps {
    name?: string;
}
export interface IWrappedFieldProps extends IPassedThroughFieldProps {
    field: FieldStore;
}
export declare function field<Props>(WrappedComponent: ComponentClass<Props & IWrappedFieldProps> | StatelessComponent<Props & IWrappedFieldProps> | string): ComponentClass<Props & IPassedThroughFieldProps>;
