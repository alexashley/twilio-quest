const config = require('config');
const twilio = require('twilio');

(async () => {
	const {accountSid, authToken, from, to} = config.get('twilio');
	const client = twilio(accountSid, authToken);

	const message = await client.messages.create({
		body: 'hello, world!',
		from,
		to
	});

	console.log(message.sid);
})();
