const { Interface } = require("./Interface");
const { Behaviour } = require("./Behaviour");
const event = require("./eventBus");

class Bot {
    constructor(botNick) {
        this.botNick = botNick;
        this.clients = [];
    }

    getOperations() {
        return {
            botNick: this.botNick,
            on: this.on.bind(this),
            emit: event.emit.bind(event),
            once: event.once.bind(event),
            __event__: event,
            clients: this.clients,
            sendMessage: this.sendMessage.bind(this),
            parse: this.parser
        };
    }

    addClient(client) {
        if (client instanceof Interface) {
            this.clients.push(client);
            client.init();
        } else {
            throw new Error(`Invalid Interface ${client}`);
        }
        return this;
    }

    addParser(parser) {
        this.parser = parser;
        return this;
    }

    on(trigger, behaviour) {
        event.on(trigger, (...params) => {
            behaviour(this.getOperations(), ...params);
        });
        return this;
    }

    sendMessage(...args) {
        this.clients.forEach(client => client.sendMessage(...args));
    }
}

module.exports = Bot;
