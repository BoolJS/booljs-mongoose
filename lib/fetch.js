'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = async function (instance, name, Component, connection) {
    let app = instance.getComponents();

    let args = [ null, app, { mongoose, Schema } ];

    let SchemaClass = Function.prototype.bind.apply(Component, args);
    let schema = new SchemaClass().__schema;

    const staticsKeys = Object
        .getOwnPropertyNames(Component)
        .filter(key => typeof Component[key] === 'function');

    for (let key of staticsKeys) {
        schema.statics[key] = function (...args) {
            return Component[key].apply(this, args);
        };
    }

    const methodsKeys = Object
        .getOwnPropertyNames(Component.prototype)
        .filter(key => typeof Component.prototype[key] === 'function');
    methodsKeys.pop();

    for (let key of methodsKeys) {
        schema.methods[key] = function (...args) {
            return Component.prototype[key].apply(this, args);
        };
    }

    let model = connection.model(name, schema);

    return class MongooseModel {
        constructor () {
            return model;
        }
    };
};
