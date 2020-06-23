
let sendMessage = (client, request, messageBody) => {
    client.messages.create({
        from:request.body.To,
        body:messageBody,
        to:request.body.From
    }).then(message => console.log(`Sent message ${message.sid}`));
}

let multiplex = (messageSet, messageMenu, client, req) => {
    let receivedMessage = parseInt(req.body.Body);
    let previousMessage = messageSet[1]['body']
        switch(previousMessage) {
            case messageMenu['introductory_message']:
                switch(receivedMessage) {
                    case 1:
                        sendMessage(client, req, messageMenu['order_message']);
                        break;
                    case 2:
                        sendMessage(client, req, messageMenu['information_message']);
                        break;
                    default:
                        sendMessage(client, req, messageMenu['error_message']);
                };
                break;
            case messageMenu['information_message']:
                switch(receivedMessage) {
                    case 1:
                        sendMessage(client, req, messageMenu['order_message']);
                        break;
                    default:
                        console.log('No message sent');
                };
                break;
            case messageMenu['order_message']:
                sendMessage(client, req, messageMenu['order_confirmation_message']);
                break;
            case messageMenu['order_confirmation_message']:
                console.log('No message sent.');
                break;
            default:
                sendMessage(client, req, messageMenu['introductory_message']);
        }
}

module.exports = {
    multiplex:multiplex
}
