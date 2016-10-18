import { Store as FormStore } from '../../store';
import { Store } from './store';
import * as React from 'react';
const omit = require('lodash/fp/omit');

const exceptComponent = omit('component');

export interface IWrappedFieldProps {
  field: Store;
}

export interface IFieldProps<Props> {
  component: React.ComponentClass<Props & IWrappedFieldProps>;
  name: string;
}

export interface IFieldContext {
  formStore: FormStore;
}

export class Field<Props> extends React.Component<Props & IFieldProps<Props>, {}> {
  public static contextTypes = {
    formStore: React.PropTypes.object.isRequired
  };
  public context: IFieldContext;

  private store: Store;
  private component: React.ComponentClass<Props & IWrappedFieldProps>;

  constructor(props: Props & IFieldProps<Props>, context: IFieldContext) {
    super(props, context);

    if (!context.formStore) {
      throw new Error('Fields must be used inside a component decorated with formobx');
    }

    this.store = new Store();
    this.component = props.component;
  }

  public componentDidMount() {
    this.context.formStore.addField(this.props.name, this.store);
  }

  public render() {
    return (
      <this.component
        {...exceptComponent(this.props) }
        field={this.store}
        />
    );
  }
}
