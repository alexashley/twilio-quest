module.exports = {
    twilio: {
		authToken: process.env.TWILIO_AUTH_TOKEN,
		accountSid: process.env.TWILIO_ACCT_SID,
		from: process.env.TWILIO_NUMBER,
		to: process.env.MY_NUMBER
    }
};
