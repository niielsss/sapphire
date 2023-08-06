const { methods, Route } = require('@sapphire/plugin-api');
const { bot_commands } = require('../lib/constants').CHANNELS;

class MessageRoute extends Route {
    constructor(context, options) {
        super(context, {
            ...options,
            route: '/message'
        });
    }

    [methods.POST](_request, response) {
        console.log('message called!');
        try {
            const { client } = this.container;
            const channel = client.channels.cache.get(bot_commands);
            channel.send(_request.body.message);
            return response.status(200).json({ message: 'Message sent.' });
        } catch (error) {
            return response.status(400).json({ message: 'Message not sent.'});
        }

    }
}

module.exports = MessageRoute;