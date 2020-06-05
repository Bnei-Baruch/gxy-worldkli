const fs = require('fs');
const db = require('./db');

const rnd = digits => {
    if (!digits) digits = 5;
    return parseInt(Math.pow(10, digits) * Math.random());
}

const myIp = () => {
    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(iface => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
            }
            ++alias;
        })

    })
}

const setSmsKey = userId => {
    const smsKey = rnd();
    return new Promise((resolve, reject) => {
        require('./db').edit({ collection: 'users', query: { _id: userId }, data: { smsKey } }).then(() => {
            resolve(smsKey);
        }, reject);
    });
}

const genUuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const clearDB = async () => {
    try {
        const now = new Date().getTime();
        const eraseTill = now - (1000 * 60 * 20); // 20 min
        const users = await db.get({ collection: 'users', query: { updated: { $lt: eraseTill } } });
        let filesToDelete = [];
        users.forEach(u => {filesToDelete.push(`${u.userId}.jpg`)});
        const filesInDir = fs.readdirSync('./images/');
        const approvedFilesToDelete = filesToDelete.filter(f => !!filesInDir.includes(f));

        for (const idx in approvedFilesToDelete) fs.unlinkSync(`./images/${approvedFilesToDelete[idx]}`);
        await db.remove({collection: 'users', query: { updated: { $lt: eraseTill }}});
        console.log(`clear db ${approvedFilesToDelete.length} files removed`);
        console.log(`clear db ${users.length} users removed`);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    rnd, myIp, setSmsKey, genUuid, clearDB
}