const request = require('request');
const template = require('lodash').template;

let apiMap = {
    // getTimelapesResult: {
    //     url: `${config.timelapesServerIp}/api/getResult`,
    //     method: 'post'
    // },
}

let api = (cfg) => {
    console.log('data api', cfg);
    const url = cfg.url || template(apiMap[cfg.type].url)(cfg.urlParams || {});
    console.log('api url', url);
    return new Promise((resolve, reject) => {
        request({
            url,
            method: cfg.method || apiMap[cfg.type].method,
            headers: cfg.headers || {},
            json: cfg.data
        }, function (err, res, body) {
            if (!err) {
                // do your thing
                resolve(body || res);
            } else {
                // handle error
                reject(err);
            }
        });
    });
}

module.exports = {
    api
}