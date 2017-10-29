const {Server} = require('hapi');
const {MessagingResponse} = require('twilio').twiml;

const server = new Server();
server.connection({port: 3000});

const todos = [];
const commands = {
    'add': (item) => {
        todos.push(item);

        return `Added ${item} to your list`;
    },
    'remove': (position) => {
        const index = parseInt(position) - 1;
        const removedItem = todos[index];

        todos.splice(index, 1);

        return `Removed ${removedItem} from your list`;
    },
    'list': () => todos.map((item, index) => `${index + 1}. ${item}`).join('\n')
};

const createTwimlResponse = (response) => {
    const twiml = new MessagingResponse();
    const action = `${process.env.NGROK_URL}/status`;

    twiml.message(response, {action});
    return twiml.toString();
};

const toDoAppHandler = (request, reply) => {
    try {
        const {payload: {Body: body}} = request;
        console.log('new message');
        const tokens = body.split(' ');
        const [command] = tokens;
        const handler = commands[command.toLowerCase()];

        if (!handler) {
            reply('Invalid request').code(400);

            return;
        }

        const input = tokens.splice(1).join(' ');
        const response = handler(input);

        reply(createTwimlResponse(response)).header('Content-Type', 'application/xml');
    } catch (error) {
        console.log(error);

        reply().code(500);
    }
};

server.route({
    handler: toDoAppHandler,
    method: 'POST',
    path: '/sms'
});


server.route({
    handler: (request, reply) => {
       const {payload: {MessageSid, SmsStatus}} = request;
       console.log(request.headers);

       console.log('MessageSid ', MessageSid);
       console.log('X-Twilio-Signature ', request.headers['x-twilio-signature']);
       console.log('Status ', SmsStatus);

       reply();
   },
    method: 'POST',
    path: '/status'
});

server.start();