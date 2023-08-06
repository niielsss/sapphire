const { methods, Route } = require('@sapphire/plugin-api');

class HelloWorldRoute extends Route {
    constructor(context, options) {
        super(context, {
            ...options,
            route: '/hello-world'
        });
    }

    [methods.GET](_request, response) {
        return response.json({ message: 'Hello world!'});
    }

    [methods.POST](_request, response) {
		response.json({ message: 'Hellow world post!' });
	}
}

module.exports = HelloWorldRoute;