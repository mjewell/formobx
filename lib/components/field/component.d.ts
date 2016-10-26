import { FormobxLeafStore } from '../../formobxLeafStore';
import { ParentStore } from '../../formobxNodeStore';
import * as React from 'react';
export interface IFieldPassedThroughProps {
    name: string;
}
export interface IFieldWrappedFieldProps extends IFieldPassedThroughProps {
    field: FormobxLeafStore;
}
export interface IFieldProps<Props> extends IFieldPassedThroughProps {
    component: React.ComponentClass<Props & IFieldWrappedFieldProps>;
}
export interface IFieldContext {
    parentStore: ParentStore;
}
export declare class Field<Props> extends React.Component<Props & IFieldProps<Props>, {}> {
    static contextTypes: {
        parentStore: React.Validator<any>;
    };
    context: IFieldContext;
    private store;
    private component;
    constructor(props: Props & IFieldProps<Props>, context: IFieldContext);
    componentDidMount(): void;
    render(): JSX.Element;
}
