
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = 8000;

const app = express();

const urlencodedparser = bodyParser.urlencoded({extended:false});

app.get('/', (req, res) => {
    res.send('The app is online');
});

app.post('/message', urlencodedparser, (req, res) => {
    console.log(req.body.Body);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
