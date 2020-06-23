
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const express = require('express');
const bodyParser = require('body-parser');

const messageMenu = require('./messageMenu.json');

const multiplex = require('./methods/methods.js').multiplex;

const port = 8000;

const app = express();

const urlencodedparser = bodyParser.urlencoded({extended:false});

app.get('/', (req, res) => {
    res.send('The app is online');
});

app.post('/message', urlencodedparser, (req, res) => {
    client.messages.list({limit:2}).then(messageSet => {
        multiplex(messageSet, messageMenu, client, req);
        res.status(200).send('succesful');
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
