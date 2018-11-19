const misc = require('../services/misc.js');

async function post(req,res,next) {
    try{
        const context = {};
        context.sender = req.body.sender;
        context.recepient = req.body.recepient;
        context.subject = req.body.subject;
        context.bodyEmail = req.body.bodyEmail;
        const rows = await misc.sendEmail(context);   
        console.log('sendEmail: did something');
        res.end(JSON.stringify(rows));
    }catch(err) {
        next(err);
    }
}

module.exports.post =  post;