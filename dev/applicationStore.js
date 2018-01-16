import { observable, action, computed } from 'mobx';

class Store {
  @observable data = 0;

  @computed
  get dataValue() {
    return this.data;
  }

  @action
  incrementData() {
    this.data = this.data + 1;
  }

}
export default new Store();
