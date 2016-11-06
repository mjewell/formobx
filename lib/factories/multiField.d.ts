import { FieldStore } from '../stores';
import { ComponentClass, StatelessComponent } from 'react';
export interface IPassedThroughMultiFieldProps {
    names?: string[];
}
export interface IMultiFieldStores {
    [name: string]: FieldStore;
}
export interface IWrappedMultiFieldProps extends IPassedThroughMultiFieldProps {
    fields: IMultiFieldStores;
}
export declare function multiField<Props>(WrappedComponent: ComponentClass<Props & IWrappedMultiFieldProps> | StatelessComponent<Props & IWrappedMultiFieldProps>): ComponentClass<Props & IPassedThroughMultiFieldProps>;
