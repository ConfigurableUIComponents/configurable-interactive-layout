import { observable, action, computed } from 'mobx';

class Store {
  @observable _card1Data = {
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

  @observable _card2Data = {
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
    return this._card2Data;
  }

  @action
  setCard2DataValues(values) {
    this._card2Data.values = values;
  }

  @computed
  get card1Data() {
    return this._card1Data;
  }

  @action
  setcard1Data(value) {
    this._card1Data = value;
  }
}
export default new Store();