const {Server} = require('hapi');
const {MessagingResponse} = require('twilio').twiml;

const server = new Server();
server.connection({port: 3000});

const fromCountryHandler = (request, reply) => {
    const {payload: {Body: body, From: from, FromCountry: fromCountry}} = request;
    console.log(`Received ${body} from ${from} in ${fromCountry}`);

    const twiml = new MessagingResponse();
    twiml.message(`Hi! It looks like your phone number was born in ${fromCountry}`);
    reply(twiml.toString()).header('Content-Type', 'application/xml');
};


const smsRoute = {
    handler: fromCountryHandler,
    method: 'POST',
    path: '/sms'
};

server.route(smsRoute);
server.start();