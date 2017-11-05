'use strict';

const MongooseModel = require('../../model');

module.exports = class DogModel extends MongooseModel {
    constructor (app, { Schema, mongoose }) {
        super(new Schema({
            name: String,
            age: Number
        }));
    }

    static list () {
        return this.find().exec();
    };
};
