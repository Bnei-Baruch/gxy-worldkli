const mongoose = require('mongoose');

// const connectionString = 'mongodb://getBBGalaxyDB:miravoyakli@getbbgalaxy-shard-00-00-jcvi4.mongodb.net:27017,getbbgalaxy-shard-00-01-jcvi4.mongodb.net:27017,getbbgalaxy-shard-00-02-jcvi4.mongodb.net:27017/test?ssl=true&replicaSet=GetBBGalaxy-shard-0&authSource=admin&retryWrites=true&w=majority'
const connectionString = 'mongodb://127.0.0.1:27017'

const connect = async () => {
    try {
        await mongoose.connect(connectionString, { useMongoClient: true });
        console.log('mongo db connection [success]');
    } catch (err) {
        console.log('mongo db connection [error]: ' + err)
    }
};

connect();

mongoose.Promise = global.Promise;

const UserModel = mongoose.model('User', {
    userName: String,
    userId: String,
    roomName: String,
    roomId: String,
    timestamp: Number,
    status: { type: Boolean, default: true },
    groupName: String
});

const collectionMap = {
    users: UserModel,
}

// cfg: {collection, query}
let remove = cfg => {
    // console.log('********* remove', cfg)
    return new Promise((resolve, reject) => {
        collectionMap[cfg.collection].find(cfg.query).remove(resolve);
    });
}

// cfg: {collection, query, data}
let edit = cfg => {
    console.log(Date(), '******edit')
    return new Promise((resolve, reject) => {
        if (cfg.multi) {
            collectionMap[cfg.collection].update(cfg.query, cfg.data, { multi: cfg.multi }, err => {
                if (err) reject({ status: 500, data: { msg: 'db error', err: err } });
                else resolve({});
            });
        } else {
            collectionMap[cfg.collection].findOneAndUpdate(cfg.query, cfg.data, { new: true }, (err, doc) => {
                if (err) reject({ status: 500, data: { msg: 'db error', err: err } });
                else resolve(doc);
            })
        }
    });
}

// cfg: {collection, query}
let get = cfg => {
    console.log(Date(), '****** get', cfg.collection);
    return new Promise((resolve, reject) => {
        collectionMap[cfg.collection].find(cfg.query).then(data => {
            resolve(data);
        }, err => {
            reject({ status: 500, data: { msg: 'db error', err: err } })
        });
    });
}

// cfg: {collection, query}
let getWithLimit = cfg => {
    console.log('****** getWithLimit', cfg)
    return new Promise((resolve, reject) => {
        collectionMap[cfg.collection].find(cfg.query).limit(cfg.limit).then(data => {
            resolve(data);
        }, err => {
            reject({ status: 500, data: { msg: 'db error', err: err } })
        });
    });
}

// cfg: {collection, data}
let create = cfg => {
    // console.log('****** get', cfg)
    return new Promise((resolve, reject) => {
        let newItem = new collectionMap[cfg.collection](cfg.data);
        newItem.save((err, item) => {
            if (err) reject({ status: 405, data: { msg: 'DB create err', err: err } });
            else resolve(item);
        })
    });
}

const createMany = async ({ docs, collection }) => {
    try {
        await collectionMap[collection].insertMany(docs);
    } catch (err) {
        throw err;
    }
}

const distinct = async ({ collection, fieldName, query }) => {
    try {
        const vals = await collectionMap[collection].find({ ...query }).distinct(fieldName);
        return vals;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    remove,
    edit,
    get,
    create,
    createMany,
    getWithLimit,
    distinct,
}