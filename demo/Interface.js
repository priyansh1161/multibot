const irc = require("irc");
const { Interface } = require("../src/index");

class IrcClient extends Interface {
    constructor(server, nick, channels) {
        super('irc');
        this.client = new irc.Client(server, nick, { channels });
        this.client.addListener('error', err => {
            console.log(err);
        });
        this.sendMessage = this.sendMessage.bind(this);
    }

    addJoinHandler() {
        this.client.addListener('join', (channel, nick) => {
            this.emit('join', channel, nick);
        });
    }

    sendMessage(channel, message) {
        this.client.say(channel, message);
    }

    addMessageHandler(actions) {
        this.client.addListener('message', (from, to, message) => {
            this.emit('message', from, to, message);
        });
    }

    init() {
        this.addJoinHandler();
        this.addMessageHandler();
    }
}

module.exports = IrcClient;
