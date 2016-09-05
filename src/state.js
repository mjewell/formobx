import { observable, computed, action, asMap } from 'mobx';
import _ from 'lodash';

export default class State {
  @observable fields = asMap({});
  @observable submitting = false;
  @observable errors = [];

  @computed
  get fieldsJS() {
    return this.fields.toJS();
  }

  @computed
  get fieldValues() {
    return _.mapValues(this.fieldsJS, f => f.value);
  }

  @computed
  get fieldErrors() {
    return _.mapValues(this.fieldsJS, f => f.errors);
  }

  @action
  addField(name, field) {
    if (this.fields.has(name)) {
      throw new Error(`Field with name '${name}' already exists on this form`);
    }

    this.fields.set(name, field);
  }

  @action updateSubmitting(submitting) {
    this.submitting = submitting;
  }

  @action clearErrors() {
    this.fields.values().forEach(field => field.updateErrors([]));
    this.updateErrors([]);
  }

  @action updateErrors(errors) {
    _.keys(errors).forEach(key => {
      if (this.fields.has(key)) {
        this.fields.get(key).updateErrors(errors[key]);
      }
    });

    this.errors = errors._base;
  }
}
