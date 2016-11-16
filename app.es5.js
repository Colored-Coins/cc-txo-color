#!/usr/bin/env node
'use strict';

var _iferr = require('iferr');

var _iferr2 = _interopRequireDefault(_iferr);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXPLORER_URL = process.env.EXPLORER_URL || 'https://testnet.explorer.coloredcoins.org/api/',
    UTXO_ENDPOINT = EXPLORER_URL + 'getutxo';

var app = require('express')();

app.set('port', process.env.PORT || 4051);
app.set('host', process.env.HOST || '127.0.0.1');

app.use(require('morgan')('dev'));

app.get('/:txid/:index', function (req, res, next) {
  // mock response for development
  //const value = 500000000 // [ 500, 5000, 10000, 20000, 50000 ][Math.random()*6|0]
  //return res.send({ assetId: 'La2wKNbCM4zwKfBP1aTDLbtZUXJ9QVv5a8yj3w', value })

  _superagent2.default.get(UTXO_ENDPOINT + '?' + _querystring2.default.stringify(req.params), (0, _iferr2.default)(next, function (resp) {
    if (resp.body && resp.body.assets && resp.body.assets.length) {
      (0, _assert2.default)(resp.body.assets.length == 1, 'does not yet support multi-asset outputs');
      var asset = resp.body.assets[0];
      res.send({ assetId: asset.assetId, value: asset.amount });
    } else {
      res.status(404).send({});
    }
  }));
});

app.listen(app.get('port'), app.get('host'), function (_) {
  return console.log('Listening on ' + app.get('host') + ':' + app.get('port'));
});

