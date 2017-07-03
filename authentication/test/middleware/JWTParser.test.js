'use strict'

const expect = require('chai').expect
const middleware = require('../../middleware/jwt_parser');
const jsonwebtoken = require('jsonwebtoken');

describe('JWTParser', () => {

    it('should correctly set items on request', (done) => {
        var req = {
            jwt: jsonwebtoken.sign({
                userId: 2,
                role: "admin"
            }, "asdf")
        };
        var res = {};
        middleware(req, res, function() {
            expect(req.body.userId).to.equal(2);
            expect(req.body.role).to.equal('admin');
            done();
        });
    });
});
