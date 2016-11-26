import { ChildStore } from '../stores';
import { IContext } from '../types';
import * as React from 'react';
export interface IFieldData {
    name?: string;
    field: ChildStore;
}
export declare abstract class ChildField<Props> extends React.Component<Props, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    context: IContext;
    protected fields: IFieldData[];
    constructor(props: Props, context: IContext);
    componentDidMount(): void;
    componentWillUnmount(): void;
    abstract render(): JSX.Element;
}
