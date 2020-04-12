
const api = require('./server/data').api;
const groups = require('./server/cfg.json').groupPrefix;
const groupsSufix = ['Center', '1', '2', '3', 'South', ''];
const md5 = require('md5');
console.log(groups);


const sleep = m => new Promise(r => setTimeout(r, m))

const init = async ()=>{
    for (let i=2000; i<2727;i++){

        await api({
            url: 'http://localhost:2200/api/userLeave',
            method: 'post', 
            data: {
                userId: i,
            }
        })
        console.log(`${i} remove success`);

        // await sleep(50)
        
    }

};

init();

