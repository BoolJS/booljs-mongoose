/* global describe, before, it */
'use strict';

describe('Dog', function () {
    var booljs      = require('bool.js')
    ,   chai        = require('chai')
    ,   asPromised  = require('chai-as-promised')
    ,   app, Dog, dogDao;

    chai.use(asPromised);
    var expect      = chai.expect;


    before(function () {
        return booljs('com.example.api')
        .setBase('example').setDatabaseLoader(require('..'))
        .run().then(function (api) {
            app = api.app;
            Dog = new app.models.Dog();
            return q.resolve();
        });
    });

    describe('Model', function () {

        it('cleans the collection', function () {
            return q.nbind(Dog.collection.remove, Dog.collection)();
        });

        it('retrieves an empty list', function () {
            return expect(Dog.list()).to.eventually.have.length(0);
        });

    });

});
