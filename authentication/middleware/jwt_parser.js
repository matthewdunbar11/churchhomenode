const jsonwebtoken = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if(typeof req.jwt != 'undefined') {
        jsonwebtoken.verify(req.jwt, 'asdf', function(err, data) {
            if(!err) {
                if(typeof req.body == 'undefined') {
                    req.body = {};
                }
                
                Object.assign(req.body, data);
            }
            next();
        });
    }
    else {
        next();        
    }
};