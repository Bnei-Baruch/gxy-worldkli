const express = require('express');
const router = express.Router();
const db = require('./db');
const cfg = require('./cfg.js');
const fs = require('fs');
const fsExtra = require('fs-extra');
const resizeImage = require('./imageUtils').resizeImage;

const getGroupName = roomName => {
    let groupName = false;
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

        if (!groupName) throw { data: { msg: 'unfamiliar group detected' } };

        fs.writeFileSync(`./images/${body.userId}.jpg`, body.image.replace(/^data:image\/png;base64,/, ""), 'base64');
        // await resizeImage({ imgPath: `./images/${body.userId}.jpg`, sufix: '-s', width: 40 });
        // await resizeImage({ imgPath: `./images/${body.userId}.jpg`, sufix: '-m', width: 80 });
        // await resizeImage({ imgPath: `./images/${body.userId}.jpg`, sufix: '-l', width: 120 });

        delete body.image;

        let wc = 'M';
        if (groupName.indexOf(' W') > 0 || groupName.indexOf('W World') > 0) {
            wc = 'W';
        }

        const now = new Date().getTime();

        await db.findOneAndUpdate({
            collection: 'users',
            data: { ...body, wc, groupName, updated: now, status: true, $setOnInsert: { created: now } },
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
        const now = new Date().getTime();
        await db.edit({ collection: 'users', query: { userId: body.userId }, data: { status: false } });
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

router.post('/getRooms', async (request, response) => {
    try {
        const { body } = request;
        const wc = body.wc || 'M';

        const _allUsers = await db.get({ collection: 'users', query: { status: true, wc } });

        let _rooms = {};

        _allUsers.forEach(user => {
            if (!_rooms[user.roomName]) _rooms[user.roomName] = 0;
            _rooms[user.roomName]++
        });

        response.json({
            rooms: Object.keys(_rooms).map(roomName => ({ roomName, sum: _rooms[roomName] }))
        });

    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'enter user error', err });
    }
});

router.post('/getBB', async (request, response) => {
    try {
        const { body } = request;
        const gender = (body.gender || 'm').toUpperCase();
        let timestamp = body.timestamp || 0;
        let { tab, type } = body;
        const roomTabs = body.rooms || [];
        const now = new Date().getTime();

        let wcGroups = [];
        // is WC
        const _wcu = await db.getWithLimit({ collection: 'users', query: { 'status': true, wc: 'M' }, limit: 1 });
        const _wcuw = await db.getWithLimit({ collection: 'users', query: { 'status': true, wc: 'W' }, limit: 1 });

        if (_wcu && _wcu.length) wcGroups.push('World Kli');
        if (_wcuw && _wcuw.length) wcGroups.push('World Kli W');

        if ((gender === 'W' && !_wcuw.length) || (gender == 'M' && !_wcu.length)) {
            response.json({ tabs: [], usersInTab: [], selectedTabIdx: -1, timestamp: now });
            return false;
        }

        const _groups = await db.distinct({ collection: 'users', query: { 'status': true }, fieldName: 'groupName' });
        const groups = wcGroups.concat(_groups).filter(g => gender == 'W' ? (g.indexOf(' W') > -1) : (g.indexOf(' W') === -1));
        console.log('groupsInDB', groups);

        let _tabs = groups.map(groupName => ({ type: 'group', label: groupName })).concat(roomTabs);
        let _tab;
        let _selectedTabIdx;
        let query = {};

        if (!tab) {
            _selectedTabIdx = 0;
        } else {
            let isTabIdx = -1;
            _tabs.forEach((t, idx) => {
                if (t.label == tab.label){
                    isTabIdx = idx;
                }
            });
            if (isTabIdx !== -1){
                _selectedTabIdx = isTabIdx;
            } else {
                _selectedTabIdx = 0;
            }
        }

        switch (_tabs[_selectedTabIdx].label) {
            case 'World Kli':
                query = { wc: 'M' };
                break;
            case 'World Kli W':
                query = { wc: 'W' };
                break;
            default:
                if (_tabs[_selectedTabIdx].type === 'group'){
                    query = { groupName: _tabs[_selectedTabIdx].label };
                } else if (_tabs[_selectedTabIdx].type === 'room'){
                    query = { roomName: _tabs[_selectedTabIdx].label };
                }
        }

        if (type === 'update'){
            query.created = { $gt: timestamp };
        }

        const _usersInTab = await db.get({ collection: 'users', query});

        const usersInTab = _usersInTab.map(u => ({ ...u._doc, image: `images/${u.userId}.jpg` }));

        response.json({
            tabs: _tabs, 
            usersInTab, 
            selectedTabIdx: _selectedTabIdx, 
            timestamp: new Date().getTime()
        });

    } catch (err) {
        response.status(err.status).json(err.data || {data: {msg: 'enter user error', err }});
    }
});
module.exports = router;