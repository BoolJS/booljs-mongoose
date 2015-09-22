/* global describe, before, it */
'use strict';

describe('Dog', function () {
    var booljs      = require('bool.js')
    ,   chai        = require('chai')
    ,   asPromised  = require('chai-as-promised')
    ,   supertest   = require('supertest-as-promised')
    ,   app, Dog, dogDao, agent;

    chai.use(asPromised);
    var expect      = chai.expect;

    before(function () {
        return booljs('com.example.api', [ require.resolve('..') ])
            .setBase('example')
            .setDatabaseLoader('booljs-mongoose')
            .run()
        .then(function (api) {
            app = api.app;
            Dog = new app.models.Dog();
            dogDao = new app.dao.Dog();
            agent = supertest(api.server);
            return q.resolve();
        });
    });

    describe('Model', function () {

        before(function () {
            return q.nbind(Dog.collection.remove, Dog.collection)();
        });

        it('retrieves an empty list', function () {
            return expect(Dog.list()).to.eventually.have.length(0);
        });

    });

    describe('DAO', function () {

        before(function () {
            return q.nbind(Dog.collection.remove, Dog.collection)();
        });

        it('retrieves an empty list', function () {
            return expect(dogDao.list()).to.eventually.have.length(0);
        });

    });

    describe('Controller', function () {

        before(function () {
            return q.nbind(Dog.collection.remove, Dog.collection)();
        });

        it('retrieves an empty list', function () {

            return agent.get('/dog').expect(200).then(function (response) {
                expect(response.body.data).to.have.length(0);
            });


        });

    });

});
