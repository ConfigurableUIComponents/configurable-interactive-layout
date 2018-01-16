import { observable, action, computed } from 'mobx';

class Store {
  formData = observable.map({
    'name': ''
  })

  getRegistrationField(name) {
    return this.formData.get(name);
  }

  @action
  set(values = {}) {
    Object.keys(values).map(key => {
      this.formData.set(key, values[key]);
    })
  }

}
export default new Store();
