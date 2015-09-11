/* jshint node: true, laxcomma: true */
'use strict';

var async   = require('async')
,   url     = require('url');

function wrapModel(_instance, model, name, mongoose) {
    var Model = require(model);

    return function () {
        return mongoose.model(
            name, new Model(
                _instance.getComponents(), mongoose.Schema, mongoose
            )
        );
    };
}

module.exports = {
    openDatabase: function (dbconfig) {
        var defer       = q.defer()
        ,   mongoose    = require('mongoose')
        ,   uriConf     = {
            protocol: 'mongodb',
            slashes: true,
            hostname: dbconfig.host,
            pathname: dbconfig.database
        };

        if(dbconfig.port){
            uriConf.port = dbconfig.port;
        }

        var connection = mongoose.createConnection(
            url.format(uriConf),
            _.omit(dbconfig, ['host', 'port', 'database'])
        );

        connection.on('connected', function () {
            defer.resolve(connection);
        });
        connection.on('error', function (err) {
            defer.reject(err);
        });

        return defer.promise;
    },
    fetchModels: function (_instance, models, mongoose) {
        var fetch = q.nbind(async.forEachOfSeries, async);

        return fetch(models, function (path, model, next) {
            var _model = wrapModel(_instance, path, model, mongoose);

            _instance.insertComponent(
                model, _model, _instance.getComponents().models
            );
            next();
        });
    }
};
