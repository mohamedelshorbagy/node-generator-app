const <%= serviceName %>Service = require('../services/<%= serviceName %>');
const ctrls = {};

ctrls.findAll = (req, res, next) => {
    return <%= serviceName %>Service.findAll().then((result) => {
        return res.status(200).json({
            data: result
        });
    });
}


module.exports = ctrls;