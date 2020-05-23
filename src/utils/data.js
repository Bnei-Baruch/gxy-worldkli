import axios from 'axios';
import { incrementBusyIndicator, decrementBusyIndicator } from '../actions/busyIndicator';
// import { getStoredCredentials, saveCredentials, clearCredentials } from './auth';
import { showNotification } from '../actions/notification';
export let dispatch, getState;

const urlPrefix = '';

const apiMap = {
    getBB: {
        url: '/api/getBB',
        method: 'post'
    },
    getRooms: {
        url: '/api/getRooms',
        method: 'post'
    }
}

const getHeaders = (isFormData) => {
    return {};
}

export function api(cfg) {
    console.log('api', cfg, dispatch);
    !cfg.disableBI && dispatch(incrementBusyIndicator());
    return new Promise((resolve, reject) => {
        axios({
            url: urlPrefix + apiMap[cfg.type].url,
            data: cfg.data,
            method: apiMap[cfg.type].method.toLowerCase(),
            headers: !cfg.dontSendHeaders && getHeaders(cfg.isFormData)
        }).then(res => {
            !cfg.disableBI && dispatch(decrementBusyIndicator());
            console.log('api res', res.data);
            resolve(res.data);
        }, err => {
            !cfg.disableBI && dispatch(decrementBusyIndicator());
            console.log("data api error: ", err.response);

            !cfg.disableErrorHandle && dispatch(showNotification({
                title: 'Error',
                text: err.response.data.msg,
            }));
        });
});
}

export function setDispatch(d) {
    dispatch = d;
}

export function setGetState(g) {
    getState = g;
}