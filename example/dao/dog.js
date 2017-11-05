'use strict';

module.exports = function (app) {
    const Dog = app.models.Dog;

    this.list = function ({ query, fields, options } = {}) {
        return new Dog().list(query, fields, options);
    };
};
