import { action } from 'mobx';
import Promise from 'bluebird';

export default class Actions {
  constructor(state) {
    this.state = state;
  }

  @action updateField(fieldName, val) {
    this.state.fields[fieldName].value = val;
  }

  @action updateErrors(errors) {
    this.state.errors = errors;
  }

  @action updateSubmitting(submitting) {
    this.state.submitting = submitting;
  }

  @action onSubmit(e, callback) {
    e.preventDefault();
    this.updateSubmitting(true);
    this.updateErrors({});
    Promise.resolve(callback(this.state.fieldVals))
      .catch(result => this.updateErrors(result))
      .then(() => this.updateSubmitting(false));
  }
}
