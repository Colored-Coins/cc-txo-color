#!/usr/bin/env node

import iferr from 'iferr'
import request from 'superagent'
import qs from 'querystring'

const
  EXPLORER_URL  = process.env.EXPLORER_URL || 'https://testnet.explorer.coloredcoins.org/api/'
, UTXO_ENDPOINT = EXPLORER_URL + 'getutxo'

const app = require('express')()

app.set('port', process.env.PORT || 4051)

app.use(require('morgan')('dev'))

app.get('/:txid/:index', (req, res, next) => {
  // mock response for development
  const value = 50000000 // [ 500, 5000, 10000, 20000, 50000 ][Math.random()*6|0]
  return res.send({ assetId: 'La2wKNbCM4zwKfBP1aTDLbtZUXJ9QVv5a8yj3w', value })

  request.get(UTXO_ENDPOINT + '?' + qs.stringify(req.params), iferr(next, resp => {
    if (resp.body && resp.body.assets && resp.body.assets.length) {
      assert(resp.body.assets.length == 1, 'does not yet support multi-asset outputs')
      const asset = resp.body.assets[0]
      res.send({ assetId: asset.assetId, value: asset.amount  })
    } else {
      res.status(404).send({ })
    }
  }))
})

app.listen(app.get('port'), _ => console.log(`Running on port ${app.get('port')}`))
