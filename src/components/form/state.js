import { observable, computed, action, asMap } from 'mobx';
import _ from 'lodash';

export default class State {
  @observable fields = asMap({});
  @observable errors = asMap({});
  @observable submitting = false;

  @computed
  get fieldValues() {
    return _.mapValues(this.fields.toJS(), f => f.value);
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
}
