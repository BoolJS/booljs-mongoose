'use strict';

const Bool = require('booljs');

const chai = require('chai');
chai.use(require('chai-as-promised'));
const { expect } = chai;
const Supertest = require('supertest-as-promised');

describe('Dog', () => {
    let app, model, dao, agent;

    before(async () => {
        let API = await new Bool('com.example.api', [ require.resolve('..') ])
            .setBase('example')
            .setDatabaseDrivers(['booljs.mongoose'])
            .run();

        agent = new Supertest(API.server);
        app = API.app;

        model = new app.models.Dog();
        dao = new app.dao.Dog();
    });

    describe('Model', () => {
        describe('#list', () => it('retrieves an empty list', () => expect(
            model.list()
        ).to.eventually.have.length(0)));
    });

    describe('DAO', () => {
        describe('#list', () => it('retrieves an empty list', () => expect(
            dao.list()
        ).to.eventually.have.length(0)));
    });

    describe('Controller', () => {
        describe('/dogs', () => it('retrieves an empty list', () => (
            expect(agent
                .get('/dogs')
                .expect(200)
                .then(res => res.body.data)
            ).to.eventually.have.length(0)
        )));
    });
});
