/* jshint node: true, laxcomma: true */
'use strict';

var async   = require('async')
,   url     = require('url')
,   mongoose    = require('mongoose');

function wrapModel(_instance, model, name, connection) {
    var Model = require(model);

    return function () {
        return connection.model(
            name, new Model(
                _instance.getComponents(), mongoose.Schema, mongoose
            )
        );
    };
}

module.exports = {
    openDatabase: function (dbconfig) {
        dbconfig = dbconfig[process.env.NODE_ENV || 'development'];

        var defer       = q.defer()
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
    fetchModels: function (_instance, models, connection) {
        var fetch = q.nbind(async.forEachOfSeries, async);

        return fetch(models, function (path, name, next) {
            var _model = wrapModel(_instance, path, name, connection, mongoose);

            _instance.insertComponent(
                name, _model, _instance.getComponents().models
            );
            next();
        });
    }
};
