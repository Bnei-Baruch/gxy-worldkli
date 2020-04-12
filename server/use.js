const apis = require('./apis')

module.exports = {
    use: app=>{
        app.use('/api', apis);
    }
}