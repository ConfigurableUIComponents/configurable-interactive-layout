import { observable, action, computed } from 'mobx';

class Store {
  @observable card1DataObj = {
    values: [
      { x: 'A', y: 5 },
      { x: 'B', y: 9 },
      { x: 'C', y: 2 },
      { x: 'D', y: 4 },
    ],
    xAxisAttrName: 'x',
    yAxisAttrName: 'y',
    yAxisLabel: 'Count',
  }

  @observable card2DataObj = {
    values: [
      { x: 'X', y: 30 },
      { x: 'Y', y: 20 },
      { x: 'Z', y: 45 },
    ],
    xAxisAttrName: 'x',
    yAxisAttrName: 'y',
    yAxisLabel: 'Count',
  }

  @computed
  get card2Data() {
    return this.card2DataObj;
  }

  @action
  setCard2DataValues(values) {
    this.card2DataObj.values = values;
  }

  @computed
  get card1Data() {
    return this.card1DataObj;
  }

  @action
  setcard1Data(value) {
    this.card1DataObj = value;
  }
}
export default new Store();
