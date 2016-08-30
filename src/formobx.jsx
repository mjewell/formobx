import React, { Component } from 'react';
import { observer } from 'mobx-react';
import State from './state';
import Actions from './actions';

export default function (Form, fields, onSubmit) {
  return @observer class extends Component {
    constructor() {
      super();
      this.state = new State(fields);
      this.actions = new Actions(this.state);
      this.partiallyAppliedOnSubmit = e => {
        this.actions.onSubmit(e, onSubmit);
      };
      this.updateField = (fieldName, val) => {
        this.actions.updateField(fieldName, val);
      };
    }

    render() {
      return (
        <Form
          fields={this.state.fieldProps}
          errors={this.state.errorMessages}
          onSubmit={this.partiallyAppliedOnSubmit}
          submitting={this.state.submitting}
          updateField={this.updateField}
        />
      );
    }
  };
}
