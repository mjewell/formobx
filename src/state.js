import { observable, computed } from 'mobx';
import _ from 'lodash';
import Field from './field';
import createErrorMessages from './createErrorMessages';

export default class Store {
  @observable fields = {};
  @observable errors = {}
  @observable submitting = false;

  constructor(fields) {
    fields.forEach(field => {
      this.fields[field] = new Field();
    });
  }

  @computed
  get errorMessages() {
    return createErrorMessages(this.errors);
  }

  @computed
  get fieldProps() {
    return _.mapValues(this.fields, field => {
      return field.toProps();
    });
  }

  @computed
  get fieldVals() {
    return _.mapValues(this.fields, field => {
      return field.value;
    });
  }
}
