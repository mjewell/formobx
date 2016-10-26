import { FormobxLeafStore } from '../../formobxLeafStore';
import { ParentStore } from '../../formobxNodeStore';
import * as React from 'react';
export interface IMultiFieldPassedThroughProps {
    names: string[];
}
export interface IMultiFieldStores {
    [name: string]: FormobxLeafStore;
}
export interface IMultiFieldWrappedFieldProps extends IMultiFieldPassedThroughProps {
    fields: IMultiFieldStores;
}
export interface IMultiFieldProps<Props> extends IMultiFieldPassedThroughProps {
    component: React.ComponentClass<Props & IMultiFieldWrappedFieldProps>;
}
export interface IMultiFieldContext {
    parentStore: ParentStore;
}
export declare class MultiField<Props> extends React.Component<Props & IMultiFieldProps<Props>, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    context: IMultiFieldContext;
    private stores;
    private component;
    constructor(props: Props & IMultiFieldProps<Props>, context: IMultiFieldContext);
    componentDidMount(): void;
    render(): JSX.Element;
}
