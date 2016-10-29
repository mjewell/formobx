import { FieldStore } from '../../stores';
import { IContext } from '../../types';
import * as React from 'react';
export interface IMultiFieldPassedThroughProps {
    names?: string[];
}
export interface IMultiFieldStores {
    [name: string]: FieldStore;
}
export interface IMultiFieldWrappedFieldProps extends IMultiFieldPassedThroughProps {
    fields: IMultiFieldStores;
}
export interface IMultiFieldProps<Props> extends IMultiFieldPassedThroughProps {
    component: React.ComponentClass<Props & IMultiFieldWrappedFieldProps>;
}
export declare class MultiField<Props> extends React.Component<Props & IMultiFieldProps<Props>, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    context: IContext;
    private stores;
    private component;
    constructor(props: Props & IMultiFieldProps<Props>, context: IContext);
    componentDidMount(): void;
    render(): JSX.Element;
}
