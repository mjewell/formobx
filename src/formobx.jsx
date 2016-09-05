import React, { Component } from 'react';
import State from './state';

function wrapOnSubmit(state, callback) {
  return function onSubmit(e) {
    e.preventDefault();
    state.updateSubmitting(true);
    state.clearErrors();
    Promise.resolve(callback(state.fieldValues))
      .catch(result => state.updateErrors(result))
      .then(() => state.updateSubmitting(false));
  };
}

export default function createForm(component, options) {
  class Form extends Component {
    constructor(props) {
      super(props);
      this.state = new State();
      this.component = component;

      if (options.onSubmit) {
        this.onSubmit = wrapOnSubmit(this.state, options.onSubmit);
      }
    }

    getChildContext() {
      return { formState: this.state };
    }

    render() {
      return (
        <this.component
          {...this.props}
          form={this.state}
          onSubmit={this.onSubmit}
        />
      );
    }
  }

  Form.childContextTypes = {
    formState: React.PropTypes.object
  };

  return Form;
}
