import EventEmitter from 'wolfy87-eventemitter';

export default class EventManager {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  subscribe(eventId, cb) {
    const l = this.eventEmitter.addListener(eventId, cb);
    console.log(l);
  }

  trigger(eventId, initiatorID, data) {
    const eventData = data || {};
    eventData.initiator = initiatorID;
    this.eventEmitter.emit(eventId, eventData);
  }

  unsubscribe(eventId, cb) {
    const l = this.eventEmitter.removeListener(eventId, cb);
    console.log(l);
  }
}
