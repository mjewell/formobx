import { ParentStore } from '../stores';
import { ChildField } from './childField';
import { IFieldProps } from './field';
import * as React from 'react';
export declare abstract class WrapperField<Props> extends ChildField<Props & IFieldProps> {
    static childContextTypes: {
        parentStore: React.Requireable<any>;
    };
    protected abstract store: ParentStore;
    getChildContext(): {
        parentStore: ParentStore;
    };
    render(): JSX.Element;
}
