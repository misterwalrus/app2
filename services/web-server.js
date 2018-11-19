const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const webServerConfig = require('../config/web-server.js' );
const apirouter = require('./router.js');
const navrouter = require('./navrouter.js');
const database = require('./database.js');



let httpServer;

function initialize() {
    return new Promise((resolve,reject) =>{
        const app = express();
        httpServer = http.createServer(app);
        app.use(bodyParser.json());
        app.unsubscribe(bodyParser.urlencoded({extended:true}));

        app.use(morgan('combined'));
        app.use('/api',apirouter);
        app.use('/',navrouter);
        // app.get('/', async (req,res)=>{
        //     const result = await database.simpleExecute('select user,systimestamp from dual');
        //     const user = result.rows[0].USER;
        //     const date = result.rows[0].SYSTIMESTAMP;
        //     res.end(`DB user: ${user}\nDate: ${date}`);
        // });
        httpServer.listen(webServerConfig.port)
        .on('listening', ()=>{
            console.log(`Web server is listening at localhost:${webServerConfig.port} `);
            resolve();
        })
        .on('error', err => {
            reject(err);
        });
            
    });
}

function close() {
    return new Promise((resolve,reject) => {
        httpServer.close((err) =>{
            if (err) { 
                reject(err);
                return;
            }
            resolve();
        });
    }) ;
}
module.exports.initialize = initialize;
module.exports.close = close;
