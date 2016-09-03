import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import State from './state';

function wrapOnSubmit(state, callback) {
  return function onSubmit(e) {
    e.preventDefault();
    state.updateSubmitting(true);
    Promise.resolve(callback(state.fieldValues))
      .catch(result => state.updateErrors(result))
      .then(() => state.updateSubmitting(false));
  };
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = new State();
    this.component = props.component;

    if (props.onSubmit) {
      this.onSubmit = wrapOnSubmit(this.state, props.onSubmit);
    }
  }

  getChildContext() {
    return { formState: this.state };
  }

  render() {
    return (
      <this.component
        {..._.omit(this.props, 'component')}
        form={this.state}
        onSubmit={this.onSubmit}
      />
    );
  }
}

Form.childContextTypes = {
  formState: React.PropTypes.object
};

Form.propTypes = {
  component: PropTypes.any.isRequired,
  onSubmit: PropTypes.func
};

export default Form;
