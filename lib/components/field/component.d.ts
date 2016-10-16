import FormStore from '../../store';
import * as React from 'react';
export interface IFieldProps {
    component: React.ComponentClass<any>;
    name: string;
    [prop: string]: any;
}
export interface IFieldContext {
    formStore: FormStore;
}
declare class Field extends React.Component<IFieldProps, {}> {
    static contextTypes: {
        formStore: React.Validator<any>;
    };
    context: IFieldContext;
    private store;
    private component;
    constructor(props: IFieldProps, context: IFieldContext);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Field;
