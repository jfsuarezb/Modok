
require('dotenv').config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const express = require('express');
const bodyParser = require('body-parser');

const messages = require('./messages.json');

const sendMessage = require('./methods/sendMessage.js').sendMessage;

const port = 8000;

const app = express();

const urlencodedparser = bodyParser.urlencoded({extended:false});

app.get('/', (req, res) => {
    res.send('The app is online');
});

app.post('/message', urlencodedparser, (req, res) => {
    let receivedMessage = parseInt(req.body.Body);
    client.messages.list({limit:2}).then(messageSet => {
        let previousMessage = messageSet[1]['body']
        switch(previousMessage) {
            case messages['introductory_message']:
                switch(receivedMessage) {
                    case 1:
                        sendMessage(client, req, messages['order_message']);
                        break;
                    case 2:
                        sendMessage(client, req, messages['information_message']);
                        break;
                    default:
                        sendMessage(client, req, messages['error_message']);
                };
                break;
            case messages['information_message']:
                switch(receivedMessage) {
                    case 1:
                        sendMessage(client, req, messages['order_message']);
                        break;
                    default:
                        console.log('No message sent');
                };
                break;
            case messages['order_message']:
                sendMessage(client, req, messages['order_confirmation_message']);
                break;
            case messages['order_confirmation_message']:
                console.log('No message sent.');
                break;
            default:
                sendMessage(client, req, messages['introductory_message']);
        }
        res.status(200).send('succesful');
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
