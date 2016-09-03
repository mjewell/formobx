import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import State from './state';

class Field extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = new State();
    this.component = props.component;
  }

  componentDidMount() {
    this.context.formState.addField(this.props.name, this.state);
  }

  render() {
    return (
      <this.component
        {..._.omit(this.props, 'component')}
        field={this.state}
      />
    );
  }
}

Field.contextTypes = {
  formState: PropTypes.object.isRequired
};

Field.propTypes = {
  component: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired
};

export default Field;
