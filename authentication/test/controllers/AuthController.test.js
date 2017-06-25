'use strict'

const expect = require('chai').expect
const authController = require('../../controllers/AuthController');
const controllerTester = require('../controller_test');

const { app } = require('../test_helpers');

describe('AuthController', () => {
  describe('"register"', () => {

    var controller;
    beforeEach(() => {
      controller = controllerTester(app, 'AuthController');
    })

    it('should create a user', (done) => {
      controller.method('doRegister', {
        username: 'test@email.com',
        password: 'password'
      }, function(res) {
        app.models.user.find({}, function (err, users) {
            expect(users.length).to.equal(1);
            done();
        });
      });
    });

    it('should return a token with the user id', (done) => {
      controller.method('doLogin', {
        username: 'test@email.com',
        password: 'password'
      }, function(res) {
        app.models.user.find({}, function(err, users) {
          console.log(users[0].id);
          done();
        });
      });
    });
  })
});
