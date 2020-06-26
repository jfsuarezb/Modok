const actionTypes = require('./actionTypes.js');


exports.sessionsReducer = (state=[], action) => {
    let phoneId = action.phone;
    let newState = [...state];
    switch(action.type) {
        case actionTypes.UPDATE_EPOCH:
            return newState.map(session => {
                if (session.phone == phoneId) {
                    session.epoch += 1;
                    return session;
                };
                return session;
            });
        case actionTypes.UPDATE_ORDER:
            return newState.map(session => {
                if (session.phone == phoneId) {
                    session.order = Object.assign(session.order, action.newOrder);
                    return session;
                };
                return session
            });
        case actionTypes.CREATE_SESSION:
            newState.push({
                phone:phoneId,
                epoch:0,
                order:{
                    paellaType:'',
                    portions:0,
                    Date: '',
                    Time: '',
                    Name:'',
                    Dir:''
                }
            });
            return newState;
        case actionTypes.END_SESSION:
            return newState.filter(session => {
                return session.phone != phoneId;
            });
        case actionTypes.RESTART_ORDER:
            return newState.map(session => {
                if (session.phone == phoneId) {
                    session.epoch = 0;
                    session.order = {
                        paellaType:'',
                        portions:0,
                        Date: '',
                        Time: '',
                        Name:'',
                        Dir:''
                    };
                    return session;
                };
                return session;
            });
        default:
            return state;
    };
};