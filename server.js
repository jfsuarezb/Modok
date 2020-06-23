
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const port = 8000;

const app = express();

const urlencodedparser = bodyParser.urlencoded({extended:false});

app.get('/', (req, res) => {
    res.send('The app is online');
});

app.post('/message', urlencodedparser, (req, res) => {
    client.messages.create({
        from:req.body.To,
        body:`You said ${req.body.Body}`,
        to:req.body.From
    }).then(message => {
        console.log(`message ${message.sid} was delivered`);
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
