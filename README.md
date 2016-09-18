# cc-txo-color

Simplified HTTP API for txo color data

### Install

```
$ npm install -g cc-txo-color
```

### Use

Running the web server:

```bash
$ PORT=7080 EXPLORER_URL=https://testnet.explorer.coloredcoins.org/api/ cc-txo-color

Running on port 7080.
```

#### `GET /:txid/:index`

```bash
$ curl -s localhost:7080/9c387b2da625b54f44b8d59f0d5164836cedc958496db6266c9e3939eea79b52/0

{"assetId":"La2wKNbCM4zwKfBP1aTDLbtZUXJ9QVv5a8yj3w","amount":75}
```

### License

https://github.com/Colu-platform/colu-nodejs/blob/master/LICENSE
