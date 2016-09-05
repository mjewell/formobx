import { observable, action } from 'mobx';

export default class State {
  @observable value = '';
  @observable errors = [];

  @action
  updateValue(val) {
    this.value = val;
  }

  @action
  updateErrors(errors) {
    this.errors = errors;
  }
}
