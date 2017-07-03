'use strict'

const expect = require('chai').expect
const roleController = require('../../controllers/RoleController');
const controllerTester = require('../controller_test');

const { app } = require('../test_helpers');

describe('RoleController', () => {
  describe('create', () => {

    let controller;
    let user;
    beforeEach((done) => {
      controller = controllerTester(app, 'RoleController');

      app.models.user.create({email: 'test@email.com', password: 'password'}).exec(function(err, u) {
        if(err) console.log(err);
        user = u;
        done();
      });;


    })

    it('should add a role to a user', (done) => {
      
    controller.method('create', {
        userId: user.id,
        role: 'admin',
        siteId: 2
      }, function(res) {
        app.models.user.find({id: user.id}, function (err, users) {
            expect(users[0].roles.length).to.equal(1);
            done();
        });
      });
    });

  });
});
