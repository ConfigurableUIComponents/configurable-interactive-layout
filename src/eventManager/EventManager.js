import EventEmitter from 'wolfy87-eventemitter';

export default class EventManager {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  subscribe(eventId, cb) {
    this.eventEmitter.addListener(eventId, cb);
  }

  publish(eventId, initiatorID, data) {
    // data.initiator = initiatorID;
    this.eventEmitter.emit(eventId, data);
  }

  unsubscribe(eventId, cb) {
    this.eventEmitter.addListener(eventId, cb);
  }
}
