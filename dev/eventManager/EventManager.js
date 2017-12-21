import EventEmitter from 'wolfy87-eventemitter';

export default class EventManager {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  subscribe(eventId, cb) {
    this.eventEmitter.addListener(eventId, cb);
  }

  publish(eventId, initiatorID, data) {
    const eventData = data || {};
    eventData.initiator = initiatorID;
    this.eventEmitter.emit(eventId, eventData);
  }

  unsubscribe(eventId, cb) {
    this.eventEmitter.addListener(eventId, cb);
  }
}
