import { ArrayStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';
export interface IArrayFieldProps {
    name?: string;
}
export declare class ArrayField extends React.Component<IArrayFieldProps, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    static childContextTypes: {
        parentStore: React.Requireable<any>;
    };
    context: IContext;
    private store;
    constructor(props: IArrayFieldProps, context: IContext);
    getChildContext(): {
        parentStore: ArrayStore;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
