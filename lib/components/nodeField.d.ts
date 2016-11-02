import { ArrayStore, ObjectStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';
export interface INodeFieldProps {
    name?: string;
}
export declare abstract class NodeField extends React.Component<INodeFieldProps, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    static childContextTypes: {
        parentStore: React.Requireable<any>;
    };
    context: IContext;
    protected store: ArrayStore | ObjectStore;
    constructor(props: INodeFieldProps, context: IContext);
    getChildContext(): {
        parentStore: ObjectStore | ArrayStore;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
