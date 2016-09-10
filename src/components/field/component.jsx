import React, { Component, PropTypes } from 'react';
import omit from 'lodash/fp/omit';
import Store from './store';

const exceptComponent = omit('component');

class Field extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = new Store();
    this.component = props.component;

    if (this.component === undefined) {
      throw new Error('component prop is required');
    }
    if (context.formStore === undefined) {
      throw new Error('formobx Fields must be used inside a formobx wrapped component');
    }
  }

  componentDidMount() {
    this.context.formStore.addField(this.props.name, this.store);
  }

  render() {
    return (
      <this.component
        {...exceptComponent(this.props)}
        field={this.store}
      />
    );
  }
}

Field.contextTypes = {
  formStore: PropTypes.object.isRequired
};

Field.propTypes = {
  component: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired
};

export default Field;
