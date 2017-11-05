'use strict';

module.exports = function (app) {
    const Dog = app.dao.Dog;
    const json = new app.views.Json();

    this.list = function (req, res, next) {
        json.promise(new Dog().list(), res, next);
    };
};
