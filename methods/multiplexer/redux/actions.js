const actionTypes = require('./actionTypes.js');
const sessionsReducer = require('./reducer').sessionsReducer;
const createStore = require('redux').createStore;
const nodemailer = require('nodemailer');

let store = createStore(sessionsReducer);

//actions

exports.checkSessionExists = (phone) => {
    return 0 != store.getState().filter(session => session.phone == phone).length;
}

exports.getEpochBySession = (phone) => {
    let epoch;
    let x;
    for (x of store.getState()) {
        if (x.phone = phone) {
            epoch = x.epoch;
            break;
        }
    }
    return epoch;
}

let getOrderBySession = (phone) => {
    let order;
    let x;
    for (x of store.getState()) {
        if (x.phone == phone) {
            order = x.order;
            break;
        }
    }
    return order;
}

exports.getOrderBySession = getOrderBySession;

exports.updateEpoch = (phone) => {
    store.dispatch({
        type:actionTypes.UPDATE_EPOCH,
        phone
    });
};

exports.updateOrder = (phone, newOrder) => {
    store.dispatch({
        type:actionTypes.UPDATE_ORDER,
        phone,
        newOrder
    });
};

exports.createSession = (phone) => {
    store.dispatch({
        type:actionTypes.CREATE_SESSION,
        phone
    });
};

exports.endSession = (phone) => {
    store.dispatch({
        type:actionTypes.END_SESSION,
        phone
    });
};

exports.restartOrder = (phone) => {
    store.dispatch({
        type:actionTypes.RESTART_ORDER,
        phone
    });
}

exports.sendEmail = (phone) => {
    let order = getOrderBySession(phone);
    let message = `Nueva Orden:\nPaella: ${order.paellaType}\nPorciones: ${order.portions}\nFecha: ${order.Date}\nHora: ${order.Time}\nNombre: ${order.Name}\nDireccion: ${order.Dir}`;
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    });
    
    let mailOptions = {
        from:process.env.EMAIL_USERNAME,
        to:process.env.RECEIVING_EMAIL,
        subject:'Nueva Orden!',
        text:message
    }
    
    transporter.sendMail(mailOptions);
}