const twilio = require('twilio');
const config = require('config');

const twilioNumber = process.env.TWILIO_QUEST_TO;
const confirmationCode = process.env.TWILIO_CONFIRMATION_CODE;

const {accountSid, authToken, from} = config.get('twilio');
const client = twilio(accountSid, authToken);

(async () => {
    try {
        const body = `Greetings! The current time is: ${Date()} ${confirmationCode}`;
        const message = await client.messages.create({
            body,
            from,
            to: twilioNumber
        });

        console.log(`Successfully received message: ${message.sid}`);
    } catch (error) {
        console.log(`error: ${error}`);
    }
})();
