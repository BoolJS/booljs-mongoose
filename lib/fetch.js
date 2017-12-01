'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = async function (instance, name, Component, connection) {
    let app = instance.getComponents();

    let args = [ null, app, { connection, Schema } ];

    let SchemaClass = Function.prototype.bind.apply(Component, args);
    let _model = new SchemaClass();
    let schema = _model.__schema;

    const modelProps = Object
        .getOwnPropertyNames(_model)
        .filter(key => typeof _model[key] !== 'function' && key !== '__schema');

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
    methodsKeys.shift();

    for (let key of methodsKeys) {
        schema.methods[key] = function (...args) {
            let _this = this;

            for (let prop of modelProps) {
                _this[prop] = _model[prop];
            }

            return Component.prototype[key].apply(_this, args);
        };
    }

    let model = connection.model(name, schema);

    return class MongooseModel {
        constructor () {
            return model;
        }
    };
};
