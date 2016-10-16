import FormStore from '../../store';
import Store from './store';
import * as React from 'react';
const omit = require('lodash/fp/omit');

const exceptComponent = omit('component');

export interface IFieldProps {
  component: React.ComponentClass<any>;
  name: string;
  [prop: string]: any;
}

export interface IFieldContext {
  formStore: FormStore;
}

class Field extends React.Component<IFieldProps, {}> {
  public static contextTypes = {
    formStore: React.PropTypes.object.isRequired
  };
  public context: IFieldContext;

  private store: Store;
  private component: React.ComponentClass<any>;

  constructor(props: IFieldProps, context: IFieldContext) {
    super(props, context);
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

export default Field;
