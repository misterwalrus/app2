const database = require('../services/database.js');

//const baseQuery = 
//` execute pucpr_pk_misc.newemail(:sender,:receipient,:subject,:bodyEmail,'pass',to_date('19-NOV-2018','DD-MON-YYYY'),null,null)
//`;
const baseQuery = 
`BEGIN
pucpr_pk_misc.newemail('avaldes@pucpr.edu','avaldes@pucpr.edu','hey, this is from node.js','this is my body','pass',to_date('19-NOV-2018','DD-MON-YYYY'),null,null);
END;
`;

const userQuery = `select user from dual`;


async function sendEmail(context) {
    let query = baseQuery;
    let binds = {};
    const opts = {};
    if (context.sender && context.recepient && context&&(context.subject || context.bodyemail)) {
        binds.sender = context.sender;
        binds.recepient =context.recepient;
        binds.subject = context.subject;
        binds = {"sender":"avaldes@pucpr.edu","receipient":"avaldes@pucpr.edu","bodyEmail":"body test","subject":"subject"};
        binds = {};
        const result = await database.simpleExecute(query,binds,opts);
        return result.rows; //it should not get any rows
    }
}

module.exports.sendEmail = sendEmail;