import { observable, computed, action, asMap } from 'mobx';
import mapValues from 'lodash/fp/mapValues';
import keys from 'lodash/keys';

const getValues = mapValues(f => f.value);
const getErrors = mapValues(f => f.errors.slice());

export default class Store {
  @observable fields = asMap({});
  @observable submitting = false;
  @observable errors = [];

  constructor(options = {}) {
    this.initialValues = options.initialValues || {};
  }

  @computed
  get fieldsJS() {
    return this.fields.toJS();
  }

  @computed
  get fieldValues() {
    return getValues(this.fieldsJS);
  }

  @computed
  get fieldErrors() {
    return getErrors(this.fieldsJS);
  }

  @action
  addField(name, field) {
    if (this.fields.has(name)) {
      throw new Error(`Field with name '${name}' already exists on this form`);
    }

    field.updateValue(this.initialValues[name] || '');
    this.fields.set(name, field);
  }

  @action updateSubmitting(submitting) {
    this.submitting = submitting;
  }

  @action clearErrors() {
    this.fields.values().forEach(field => field.clearErrors());
    this.errors.clear();
  }

  @action updateErrors(errors) {
    this.errors.replace(errors);
  }

  @action updateAllErrors(errors) {
    keys(errors).forEach(key => {
      if (this.fields.has(key)) {
        this.fields.get(key).updateErrors(errors[key] || []);
      }
    });

    this.updateErrors(errors._base || []);
  }
}
