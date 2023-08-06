const { methods, Route } = require('@sapphire/plugin-api');

class MainRoute extends Route {
    constructor(context, options) {
        super(context, {
            ...options,
            route: '/'
        });
    }

    [methods.GET](_request, response) {
		return response.json({ message: 'main endpoint!' });
	}

	/*[methods.POST](_request, response) {
		response.json({ message: 'main endpoint!' });
	}*/
}

module.exports = MainRoute;