const students = require('../db_apis/students.js');

async function get(req,res,next) {
    try{
        const context = {};
        context.pidm = parseInt(req.params.pidm,10);

        const rows = await students.find(context);

        if(req.params.pidm) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            }else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    }catch(err) {
        next(err);
    }
}

module.exports.get = get;