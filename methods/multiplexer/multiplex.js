const actions = require('./redux/actions');
const messageMenu = require('./messageMenu.json');

exports.multiplex = (phone, message) => {
    let numMessage;
    try {
        numMessage = parseInt(message);
    } catch(e) {
        numMessage =  e;
    };
    if (!actions.checkSessionExists(phone)) {
        actions.createSession(phone);
        return messageMenu['INTRO_MESSAGE'];
    } else {
        let messageToSend;
        switch(actions.getEpochBySession(phone)) {
            case 0:
               switch(numMessage) {
                    case 1:
                        actions.updateEpoch(phone);
                        actions.updateEpoch(phone);
                        messageToSend = messageMenu['PAELLA_MENU_MESSAGE'];
                        break;
                    case 2:
                        actions.updateEpoch(phone);
                        messageToSend = messageMenu['INFO_MESSAGE'];
                        break;
                    default:
                        messageToSend = messageMenu['ERROR_MESSAGE'];
               };
               break;
            case 1:
               switch(numMessage) {
                    case 1:
                        actions.updateEpoch(phone);
                        messageToSend = messageMenu['PAELLA_MENU_MESSAGE'];
                        break;
                    default:
                        actions.endSession(phone);
                        messageToSend = null;
               };
               break;
            case 2:
               switch(numMessage) {
                    case 1:
                        actions.updateEpoch(phone);
                        actions.updateOrder(phone,{paellaType:"Andaluza"});
                        messageToSend = messageMenu['PORTIONS_MESSAGE'];
                        break;
                    case 2:
                        actions.updateEpoch(phone);
                        actions.updateOrder(phone,{paellaType:"Mediterranea"});
                        messageToSend = messageMenu['PORTIONS_MESSAGE'];
                        break;
                    case 3:
                        actions.updateEpoch(phone);
                        actions.updateOrder(phone,{paellaType:"Sevillana"});
                        messageToSend = messageMenu['PORTIONS_MESSAGE'];
                        break;
                    case 4:
                        actions.updateEpoch(phone);
                        actions.updateOrder(phone,{paellaType:"Flamenca"});
                        messageToSend = messageMenu['PORTIONS_MESSAGE'];
                        break;
                    case 5:
                        actions.updateEpoch(phone);
                        actions.updateOrder(phone,{paellaType:"Marinera"});
                        messageToSend = messageMenu['PORTIONS_MESSAGE'];
                        break;
                    case 6:
                        actions.updateEpoch(phone);
                        actions.updateOrder(phone,{paellaType:"Valenciana"});
                        messageToSend = messageMenu['PORTIONS_MESSAGE'];
                        break;
                    case 7:
                        actions.updateEpoch(phone);
                        actions.updateOrder(phone,{paellaType:"Vegetariana"});
                        messageToSend = messageMenu['PORTIONS_MESSAGE'];
                        break;
                    default:
                        messageToSend = messageMenu['ERROR_MESSAGE'];
               };
               break;
            case 3:
               if (Number.isInteger(numMessage)) {
                   actions.updateEpoch(phone);
                   actions.updateOrder(phone, {portions:numMessage});
                   messageToSend = messageMenu['DATE_MESSAGE'];
               } else {
                   messageToSend = messageMenu['ERROR_MESSAGE'];
               }
               break;
            case 4:
               actions.updateEpoch(phone);
               actions.updateOrder(phone,{Date:message});
               messageToSend = messageMenu['TIME_MESSAGE'];
               break;
            case 5:
               actions.updateEpoch(phone);
               actions.updateOrder(phone,{Time:message});
               messageToSend = messageMenu['NAME_MESSAGE'];
               break;
            case 6:
               actions.updateEpoch(phone);
               actions.updateOrder(phone,{Name:message});
               messageToSend = messageMenu['DIRECTION_MESSAGE'];
               break;
            case 7:
               let order = actions.getOrderBySession(phone);
               actions.updateEpoch(phone);
               actions.updateOrder(phone,{Dir:message});
               messageToSend = `Este es tu pedido:\nPaella: ${order.paellaType}\nPorciones: ${order.portions}\nFecha: ${order.Date}\nHora: ${order.Time}\nDireccion: ${order.Dir}\nSi quieres confirmar tu pedido, envia 1.\nSi quieres volver a empezar, envia 2.`;
               break;
            case 8:
               switch(numMessage) {
                   case 1:
                        actions.sendEmail(phone);
                        actions.endSession(phone);
                        messageToSend = "Muchas Gracias por tu pedido!"
                        break;
                    case 2:
                        actions.restartOrder(phone);
                        messageToSend = messageMenu['PAELLA_MENU_MESSAGE'];
                        break;
                    default:
                        messageToSend = messageMenu['ERROR_MESSAGE'];
               };
               break;
            default:
               messageToSend = null;
        }
        return messageToSend;
    }
};