const { Bot } = require('../src/index');
const ircClient = require('./Interface');
const helpBehaviour = require('./behaviour');

const bot = new Bot('test-bot');

const config = {
    "channels": ["#nkgg"],
    "server": "irc.oftc.net",
    "name": "plotsbot-test"
};


function parseMessage(message) {
    return message.split(/[\s,.;:!?]/g).filter(String);
}

bot
    .addClient(new ircClient(config.server, config.name, config.channels))
    .addParser(parseMessage)
    .on('message', (operations, from, to, message) => {
        const tokens = operations.parse(message);
        const helpBehaviour = tokens.find(token => token === 'help');
        if (helpBehaviour) {
            return operations.emit('help', {
                from,
                to,
                message,
                tokens,
            });
        }
    })
    .on('help', (operations, { from, to, tokens }) => {
        const response = helpBehaviour(operations.botNick, tokens);
        if (response) {
            if (to === operations.botNick) {
                // Message was recieved in a DM
                operations.sendMessage(from, response);
            } else {
                // Message was recieved in a normal channel
                operations.sendMessage(to, response);
            }
        }
    })
    .on('join', () => {
        console.log('Joined channel !!');
    });
