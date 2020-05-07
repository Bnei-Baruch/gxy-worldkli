
const api = require('./server/data').api;

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

