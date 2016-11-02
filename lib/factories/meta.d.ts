import { ParentStore } from '../stores';
import * as React from 'react';
export interface IPassedThroughMetaProps {
}
export interface IWrappedMetaProps extends IPassedThroughMetaProps {
    field: ParentStore;
}
export interface IMetaComponent<Props> extends React.ComponentClass<Props & IPassedThroughMetaProps> {
}
export declare function meta<Props>(Component: React.ComponentClass<Props & IWrappedMetaProps>): IMetaComponent<Props & IPassedThroughMetaProps>;
