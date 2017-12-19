import { observable, action, computed } from 'mobx';
import Project from './project';

class Store {

    @observable counter1 = 0;
    @observable counter2 = 0;
    @observable _customData = {};
    project1 = new Project();

    @computed
    get customData() {
        return this._customData;
    }

    @action
    addDynamicAttribute(key, value) {
        this._customData[key] = value;
    }

    @action
    addDynamicChildAttribute(key, subKey, value) {
        this._customData[key] = {};
        this._customData[key][subKey] = value;
    }

    @action
    setProjectStatus(value) {
        this.project.setProjectStatus(value);

    }

    @computed
    get project(){
        return this.project1;
    }

    @computed
    get counter() {
        return this.counter1;
    }

    @computed
    get counterShula() {
        return this.counter2;
    }

    @computed
    get counterToString() {
        return this.counter1 + ' Counter from store';
    }

    @action
    setCounter(value) {
        this.counter1 = value;
    }


}

export default new Store();