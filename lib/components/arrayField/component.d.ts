import { ArrayStore } from '../../stores';
import { IContext } from '../../types';
import * as React from 'react';
export interface IProps {
    name?: string;
}
export declare class ArrayField extends React.Component<IProps, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    static childContextTypes: {
        parentStore: React.Requireable<any>;
    };
    context: IContext;
    private store;
    constructor(props: IProps, context: IContext);
    getChildContext(): {
        parentStore: ArrayStore;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
