#!/usr/bin/env node

import iferr from 'iferr'
import request from 'superagent'
import qs from 'querystring'

const
  EXPLORER_URL  = process.env.EXPLORER_URL || 'https://testnet.explorer.coloredcoins.org/api/'
, UTXO_ENDPOINT = EXPLORER_URL + 'getutxo'
, app = require('express')()

app.set('port', process.env.PORT || 4051)

app.use(require('morgan')('dev'))

app.get('/:txid/:index', (req, res, next) => {
  request.get(UTXO_ENDPOINT + '?' + qs.stringify(req.params), iferr(next, resp => {
    const asset = resp.body.assets[0] // @XXX assumes single-asset outputs
    res.send({ assetId: asset.assetId, amount: asset.amount  })
  }))
})

app.listen(app.get('port'), _ => console.log(`Running on port ${app.get('port')}`))
