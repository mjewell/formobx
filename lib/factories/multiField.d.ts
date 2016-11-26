import { IMultiFieldProps, IMultiFieldStores } from '../components';
import { ComponentClass, StatelessComponent } from 'react';
export interface IWrappedMultiFieldProps extends IMultiFieldProps {
    fields: IMultiFieldStores;
}
export declare function multiField<Props>(MultiFieldComponent: (ComponentClass<Props & IWrappedMultiFieldProps> | StatelessComponent<Props & IWrappedMultiFieldProps>)): ComponentClass<Props & IMultiFieldProps>;
