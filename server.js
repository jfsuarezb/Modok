
require('dotenv').config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const express = require('express');
const bodyParser = require('body-parser');

const messages = require('./messages.json');

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
                        client.messages.create({
                            from:req.body.To,
                            body:messages['order_message'],
                            to:req.body.From
                        }).then(message => console.log(`Sent message ${message.sid}`));
                        break;
                    case 2:
                        client.messages.create({
                            from:req.body.To,
                            body:messages['information_message'],
                            to:req.body.From
                        }).then(message => console.log(`Sent message ${message.sid}`));
                        break;
                    default:
                        client.messages.create({
                            from:req.body.To,
                            body:messages['error_message'],
                            to:req.body.From
                        }).then(message => console.log(`Sent message ${message.sid}`));
                };
                break;
            case messages['information_message']:
                switch(receivedMessage) {
                    case 1:
                        client.messages.create({
                            from:req.body.To,
                            body:messages['order_message'],
                            to:req.body.From
                        }).then(message => console.log(`Sent message ${message.sid}`));
                        break;
                    default:
                        console.log('No message sent');
                };
                break;
            case messages['order_message']:
                client.messages.create({
                    from:req.body.To,
                    body:messages['order_confirmation_message'],
                    to:req.body.From
                }).then(message => console.log(`Sent message ${message.sid}`));
                break;
            case messages['order_confirmation_message']:
                console.log('No message sent.');
                break;
            default:
                client.messages.create({
                    from:req.body.To,
                    body:messages['introductory_message'],
                    to:req.body.From
                }).then(message => console.log(`Sent message ${message.sid}`))
        }
        res.status(200).send('succesful');
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
