import { FieldStore } from '../../stores';
import { IContext } from '../../types';
import * as React from 'react';
export interface IFieldPassedThroughProps {
    name?: string;
}
export interface IFieldWrappedFieldProps extends IFieldPassedThroughProps {
    field: FieldStore;
}
export interface IFieldProps<Props> extends IFieldPassedThroughProps {
    component: React.ComponentClass<Props & IFieldWrappedFieldProps>;
}
export declare class Field<Props> extends React.Component<Props & IFieldProps<Props>, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    context: IContext;
    private store;
    private component;
    constructor(props: Props & IFieldProps<Props>, context: IContext);
    componentDidMount(): void;
    render(): JSX.Element;
}
