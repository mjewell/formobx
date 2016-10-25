import { FormobxNodeStore, ParentStore } from '../../formobxNodeStore';
import * as React from 'react';
export interface IProps {
    name: string;
}
export interface ISectionContext {
    parentStore: ParentStore;
}
export declare class Section extends React.Component<IProps, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    static childContextTypes: {
        parentStore: React.Requireable<any>;
    };
    context: ISectionContext;
    private store;
    constructor(props: IProps, context: ISectionContext);
    getChildContext(): {
        parentStore: FormobxNodeStore;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
