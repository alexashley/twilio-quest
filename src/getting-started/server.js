const {Server} = require('hapi'); 
const {MessagingResponse} = require('twilio').twiml;

const server = new Server();
server.connection({port: 3000});

const smsRoute = {
	handler: (request, reply) => {
		const twiml = new MessagingResponse();
		twiml.message('PONG');

		reply(twiml.toString()).header('Content-Type', 'application/xml');
	},
	method: 'POST',
	path: '/sms'
};

server.route(smsRoute);

server.start();
