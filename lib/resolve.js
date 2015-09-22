'use strict';

module.exports = function (_path) {
    return require('path').join(require.resolve('..'), '..', _path);
};
