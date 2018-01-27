const event = require('./eventBus');

class Interface {
    constructor(name) {
        if (!name) {
            throw new Error('Please Provide a valid name to Interface');
        }
        this.name = name;
    }

    emit(keyword, ...parms) {
        event.emit(keyword, ...parms);
    }

    init() { }
}

module.exports = Interface;
