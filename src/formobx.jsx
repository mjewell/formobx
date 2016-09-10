import React, { Component } from 'react';
import Store from './store';

function wrapOnSubmit(store, callback) {
  return function onSubmit(e) {
    e.preventDefault();
    store.updateSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.fieldValues))
      .catch(result => store.updateAllErrors(result))
      .then(() => store.updateSubmitting(false));
  };
}

export default function formobx(component, options = {}) {
  class Form extends Component {
    constructor(props) {
      super(props);
      this.store = new Store(options);
      this.component = component;

      if (options.onSubmit) {
        this.onSubmit = wrapOnSubmit(this.store, options.onSubmit);
      }
    }

    getChildContext() {
      return { formStore: this.store };
    }

    render() {
      return (
        <this.component
          {...this.props}
          form={this.store}
          onSubmit={this.onSubmit}
        />
      );
    }
  }

  Form.childContextTypes = {
    formStore: React.PropTypes.object
  };

  return Form;
}
