import { ArrayStore, FieldStore } from '../stores';
import { IContext } from '../types';
import { observer } from 'mobx-react';
import * as React from 'react';

export interface IPassedThroughFieldProps {
    name?: string;
}

export interface IWrappedFieldProps extends IPassedThroughFieldProps {
    field: FieldStore;
}

export interface IFieldComponent<Props> extends React.ComponentClass<Props & IPassedThroughFieldProps> { }

export function field<Props>(
    Component: React.ComponentClass<Props & IWrappedFieldProps> | string
): IFieldComponent<Props & IPassedThroughFieldProps> {
    class Field extends React.Component<Props & IPassedThroughFieldProps, {}> {
        public static contextTypes = {
            parentStore: React.PropTypes.object.isRequired
        };
        public context: IContext;
        private store: FieldStore;

        constructor(props: Props & IPassedThroughFieldProps, context: IContext) {
            super(props, context);

            if (!context.parentStore) {
                throw new Error('Fields must be used inside a component decorated with formobx');
            }

            this.store = new FieldStore();
        }

        public componentDidMount() {
            const parentStore = this.context.parentStore;
            if (parentStore instanceof ArrayStore) {
                parentStore.registerField(this.store);
            } else {
                if (!this.props.name) {
                    throw new Error('Name is required when the parent is not an ArrayField');
                }
                parentStore.registerField(this.props.name, this.store);
            }
        }

        public componentWillUnmount() {
            const parentStore = this.context.parentStore;
            if (parentStore instanceof ArrayStore) {
                parentStore.unregisterField(this.store);
            } else {
                if (!this.props.name) {
                    throw new Error('Name is required when the parent is not an ArrayField');
                }
                parentStore.unregisterField(this.props.name);
            }
        }

        public render() {
            // TODO: handle other string types
            if (Component === 'input') {
                return <input {...this.props} {...this.store.asProps} />;
            }
            return <Component {...this.props} field={this.store} />;
        }
    }

    return observer(Field);
}
