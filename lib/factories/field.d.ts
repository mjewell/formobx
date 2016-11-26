import { IFieldProps } from '../components';
import { FieldStore } from '../stores';
import { ComponentClass, StatelessComponent } from 'react';
export interface IWrappedFieldProps extends IFieldProps {
    field: FieldStore;
}
export declare function field<Props>(FieldComponent: (ComponentClass<Props & IWrappedFieldProps> | StatelessComponent<Props & IWrappedFieldProps> | string)): ComponentClass<Props & IFieldProps>;
