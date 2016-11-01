import { ObjectStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';
export interface IObjectFieldProps {
    name?: string;
}
export declare class ObjectField extends React.Component<IObjectFieldProps, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    static childContextTypes: {
        parentStore: React.Requireable<any>;
    };
    context: IContext;
    private store;
    constructor(props: IObjectFieldProps, context: IContext);
    getChildContext(): {
        parentStore: ObjectStore;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
