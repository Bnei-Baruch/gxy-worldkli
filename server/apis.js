const express = require('express');
const router = express.Router();
const db = require('./db');
const cfg = require('./cfg.js');
const fs = require('fs');
const fsExtra = require('fs-extra');
const resizeImage = require('./imageUtils').resizeImage;

const getGroupName = roomName => {
    let groupName = '';
    for (const group of cfg.groupsBy) {
        if (roomName.indexOf(group.roomPrefix) == 0) {
            groupName = group.groupBy;
            break;
        }
    }

    return groupName;
}

router.post('/userEnter', async (request, response) => {
    try {
        const { body } = request;
        if (!body.userName) throw { status: 400, data: { msg: 'userName was not found' } };
        if (!body.userId) throw { status: 400, data: { msg: 'userId was not found' } };
        if (!body.roomName) throw { status: 400, data: { msg: 'roomName was not found' } };
        if (!body.roomId) throw { status: 400, data: { msg: 'roomId was not found' } };
        if (!body.image) throw { status: 400, data: { msg: 'image was not found' } };

        const groupName = getGroupName(body.roomName);

        fs.writeFileSync(`./images/${body.userId}.jpg`, body.image.replace(/^data:image\/png;base64,/, ""), 'base64');
        await resizeImage({imgPath: `./images/${body.userId}.jpg`, sufix: '-s', width: 40});
        await resizeImage({imgPath: `./images/${body.userId}.jpg`, sufix: '-m', width: 80});
        await resizeImage({imgPath: `./images/${body.userId}.jpg`, sufix: '-l', width: 120});

        delete body.image;

        let wc = 'M';
        if (groupName.indexOf(' W') > 0 || groupName.indexOf('W World') > 0) {
            wc = 'W';
        }

        await db.findOneAndUpdate({
            collection: 'users',
            data: { ...body, wc, groupName, timestamp: new Date().getTime(), status: true },
            query: { userId: body.userId }
        });

        console.log(`${body.userName} enter | ${body.userId}.jpg`)
        response.json();
    } catch (err) {
        response.status(err.status || 400).json(err.data || { msg: 'enter user error', err });
    }
});

router.post('/userLeave', async (request, response) => {
    try {
        const { body } = request;
        if (!body.userId) throw { status: 400, data: { msg: 'userId was not found' } };
        const timestamp = new Date().getTime();
        await db.edit({ collection: 'users', query: { userId: body.userId }, data: { status: false, timestamp } });
        console.log(`${body.userId} left`);
        response.json();
    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'enter user error', err });
    }
});

router.post('/delete', async (request, response) => {
    try {
        await db.remove({ collection: 'users', query: {} });
        fsExtra.emptyDirSync('./images');
        response.json();
    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'enter user error', err });
    }
});

router.post('/getBB', async (request, response) => {
    try {
        const { body } = request;
        const gender = (body.gender || 'm').toUpperCase();
        let timestamp = body.timestamp || 0;
        let { selectedGroup } = body;
        const now = new Date().getTime();
        let wcGroups = [];
        // is WC
        const _wcu = await db.getWithLimit({ collection: 'users', query: { 'status': true, wc: 'M' }, limit: 1 });
        const _wcuw = await db.getWithLimit({ collection: 'users', query: { 'status': true, wc: 'W' }, limit: 1 });

        if (_wcu && _wcu.length) wcGroups.push('World Kli');
        if (_wcuw && _wcuw.length) wcGroups.push('World Kli W');

        if (!wcGroups.length) {
            response.json({ groups: [], usersInGroup: [], selectedGroup: '', timestamp: now });
            return false;
        }

        const _groups = await db.distinct({ collection: 'users', query: { 'status': true }, fieldName: 'groupName' });
        const groups = wcGroups.concat(_groups).filter(g => gender=='W' ? (g.indexOf(' W') > -1) : (g.indexOf(' W') === -1));
        console.log('groupsInDB', groups);

        if (!selectedGroup) {
            selectedGroup = groups[0];
        }

        let query = {};

        switch (selectedGroup){
            case 'World Kli':
                query = {wc: 'M'};
                break;
            case 'World Kli W':
                query = {wc: 'W'};
                break;
            default:
                query = {groupName: selectedGroup};
        }

        const _usersInGroup = await db.get({ collection: 'users', query: { ...query, timestamp: { $gt: timestamp } } });

        const usersInGroup = _usersInGroup.map(u => ({ ...u._doc, image: `images/${u.userId}.jpg` }))
        response.json({
            timestamp: now,
            selectedGroup: selectedGroup,
            usersInGroup,
            groups
        });

    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'enter user error', err });
    }
});
module.exports = router;