import { Store as FormStore } from '../../store';
import { Store } from './store';
import * as React from 'react';
export interface IPassedThroughProps {
    name: string;
}
export interface IWrappedFieldProps extends IPassedThroughProps {
    field: Store;
}
export interface IFieldProps<Props> extends IPassedThroughProps {
    component: React.ComponentClass<Props & IWrappedFieldProps>;
}
export interface IFieldContext {
    formStore: FormStore;
}
export declare class Field<Props> extends React.Component<Props & IFieldProps<Props>, {}> {
    static contextTypes: {
        formStore: React.Validator<any>;
    };
    context: IFieldContext;
    private store;
    private component;
    constructor(props: Props & IFieldProps<Props>, context: IFieldContext);
    componentDidMount(): void;
    render(): JSX.Element;
}
