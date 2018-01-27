const EventEmitter = require('events');

class Events extends EventEmitter {}

const bus = new Events();

module.exports = bus;