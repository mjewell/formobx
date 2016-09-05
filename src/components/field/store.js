import { observable, computed, action } from 'mobx';

export default class Store {
  @observable value = '';
  @observable errors = [];

  @computed
  get asProps() {
    return {
      defaultValue: this.value,
      onChange: e => {
        this.updateValue(e.target.value);
      }
    };
  }

  @action
  updateValue(val) {
    this.value = val;
  }

  @action
  updateErrors(errors) {
    this.errors = errors;
  }
}
