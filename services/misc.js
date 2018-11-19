const database = require('../services/database.js');

const userQuery = `select user from dual`;
//NOTE: important: do not use bind variables on DDL statements.
async function sendEmail(context) {
    const opts = {};
    const binds = {}; //not used here
    if (context.sender && context.recepient && context&&(context.subject || context.bodyemail)) {
        let query = `BEGIN
         pucpr_pk_misc.newemail('`+context.sender+`','`+context.recepient+`','`+context.subject+`','`+context.bodyEmail+`','pass',sysdate,null,null);
         END;`;
        const result = await database.simpleExecute(query,binds,opts);
        return result.rows; //it should not get any rows
    }
}

module.exports.sendEmail = sendEmail;