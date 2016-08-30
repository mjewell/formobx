import { observable } from 'mobx';

export default class Field {
  @observable value = ''

  toProps() {
    return {
      defaultValue: this.value,
      onChange: e => {
        this.value = e.target.value;
      }
    };
  }
}
