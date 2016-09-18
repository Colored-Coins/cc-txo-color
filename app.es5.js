#!/usr/bin/env node
'use strict';

var _iferr = require('iferr');

var _iferr2 = _interopRequireDefault(_iferr);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXPLORER_URL = process.env.EXPLORER_URL || 'https://testnet.explorer.coloredcoins.org/api/',
    UTXO_ENDPOINT = EXPLORER_URL + 'getutxo',
    app = require('express')();

app.set('port', process.env.PORT || 4051);

app.use(require('morgan')('dev'));

app.get('/:txid/:index', function (req, res, next) {
  _superagent2.default.get(UTXO_ENDPOINT + '?' + _querystring2.default.stringify(req.params), (0, _iferr2.default)(next, function (resp) {
    var asset = resp.body.assets[0]; // @XXX assumes single-asset outputs
    res.send({ assetId: asset.assetId, amount: asset.amount });
  }));
});

app.listen(app.get('port'), function (_) {
  return console.log('Running on port ' + app.get('port'));
});

