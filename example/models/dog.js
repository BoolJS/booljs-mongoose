'use strict';

var dogs = [];

module.exports = function (app, Schema, mongoose) {

    var DogSchema = new Schema({
        name: String,
        age: Number
    });

    DogSchema.statics.list = function () {
        return q.nbind(this.find, this)();
    };

    return DogSchema;
};
