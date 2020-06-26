require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const express = require('express');
const bodyParser = require('body-parser');

const multiplex = require('./methods/multiplexer/multiplex.js').multiplex;
const sendMessage = require('./methods/sendMessage.js').sendMessage;

const port = 8000;

const app = express();

const urlencodedparser = bodyParser.urlencoded({extended:false});

app.get('/', (_, res) => {
    res.status(200).send('The app is online');
});

app.post('/message', urlencodedparser, (req, res) => {
    let messageToSend = multiplex(req.body.From,req.body.Body);
    sendMessage(client,req,messageToSend);
    res.status(200).send('succesful');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
