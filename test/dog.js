'use strict';

const Bool = require('booljs');

const chai = require('chai');
chai.use(require('chai-as-promised'));
const { expect } = chai;

describe('Dog', () => {
    let model;

    before(async () => {
        let { app } = await new Bool('com.example.api', [require.resolve('..')])
            .setBase('example')
            .setDatabaseDrivers(['booljs.mongoose'])
            .run();

        model = new app.models.Dog();
    });

    describe('Model', () => {
        describe('#list', () => it('retrieves an empty list', () => expect(
            model.list()
        ).to.eventually.have.length(0)));
    });
});
