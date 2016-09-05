import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Store from './store';

class Field extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = new Store();
    this.component = props.component;
  }

  componentDidMount() {
    this.context.formStore.addField(this.props.name, this.store);
  }

  render() {
    return (
      <this.component
        {..._.omit(this.props, 'component')}
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
