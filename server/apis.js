const express = require('express');
const router = express.Router();
const db = require('./db');
const cfg = require('./cfg.json');
const fs = require('fs');

router.post('/userEnter', async (request, response) => {
    try {
        const { body } = request;
        if (!body.userName) throw { status: 400, data: { msg: 'userName was not found' } };
        if (!body.userId) throw { status: 400, data: { msg: 'userId was not found' } };
        if (!body.roomName) throw { status: 400, data: { msg: 'roomName was not found' } };
        if (!body.roomId) throw { status: 400, data: { msg: 'roomId was not found' } };
        if (!body.image) throw { status: 400, data: { msg: 'image was not found' } };


        fs.writeFileSync(`./public/users/${body.userId}.jpg`, body.image.replace(/^data:image\/png;base64,/, ""), 'base64');

        delete body.image;

        let groupName = body.roomName.split(' ')[0];
        if (!cfg.groupPrefix.includes(groupName)) groupName = body.roomName;

        await db.create({ collection: 'users', data: { ...body, groupName, timestamp: new Date().getTime() } });
        console.log(`${body.userName} enter | ${body.userId}.jpg`)
        response.json();
    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'enter user error', err });
    }
});

router.post('/userLeave', async (request, response) => {
    try {
        const { body } = request;
        if (!body.userId) throw { status: 400, data: { msg: 'userId was not found' } };
        const timestamp = new Date().getTime();
        await db.edit({ collection: 'users', query: { userId: body.userId }, data: {status: false, timestamp} });
        console.log(`${body.userId} left`);
        response.json();
    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'enter user error', err });
    }
});

router.post('/getBB', async (request, response) => {
    try {
        const { body } = request;
        let timestamp = body.timestamp || 0;
        let { selectedGroup } = body;
        const now = new Date().getTime();

        if (!selectedGroup) {
            const _users = await db.getWithLimit({ collection: 'users', query: {}, limit: 1 });
            if (!_users.length) {
                response.json({ groups: [], usersInGroup: [], selectedGroup: '', timestamp: now });
                return false;
            }
            selectedGroup = _users[0].groupName;
        }

        const groups = await db.distinct({ collection: 'users', query:{status: true}, fieldName: 'groupName' });
        console.log('groupsInDB', groups);

        const _usersInGroup = await db.get({ collection: 'users', query: { groupName: selectedGroup, timestamp: { $gt: timestamp } } });

        const usersInGroup = _usersInGroup.map(u => ({...u._doc, image: `public/users/${u.userId}.jpg`}))
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