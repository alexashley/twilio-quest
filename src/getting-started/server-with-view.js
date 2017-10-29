const {Server} = require('hapi');

const server = new Server();
server.connection({port: 3000});

server.register(require('vision'), () => {
	server.views({
    	engines: {
        	'html': {
            	module: {
					compile: (template, options) => (context, options) => '<p>Hello, world!</p>'
				},
            	compileMode: 'sync'
        	}
    	},
	});

	const helloRoute = {
		handler: (request, reply) => {
			reply.view('dummy-template');
		},
		method: 'GET',
		path: '/hello'
	};
	server.route(helloRoute);

	server.start();
});

