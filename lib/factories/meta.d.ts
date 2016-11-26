import { ParentStore } from '../stores';
import { ComponentClass, StatelessComponent } from 'react';
export interface IWrappedMetaProps {
    field: ParentStore;
}
export declare function meta<Props>(MetaComponent: ComponentClass<Props & IWrappedMetaProps> | StatelessComponent<Props & IWrappedMetaProps>): ComponentClass<Props>;
