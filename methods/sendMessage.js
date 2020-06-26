
exports.sendMessage = (client, request, messageBody) => {
    client.messages.create({
        from:request.body.To,
        body:messageBody,
        to:request.body.From
    }).then(message => console.log(`Sent message ${message.sid}`));
}
