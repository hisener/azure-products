# azure-products

List of Microsoft Azure products

[![Build Status][travis-image]][travis-url] [![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![JavaScript Style Guide][standardjs-image]](https://standardjs.com)

It's just two JSON files that can be used in any environment.

[travis-image]: https://travis-ci.org/hisener/azure-products.svg?branch=master
[travis-url]: https://travis-ci.org/hisener/azure-products
[npm-image]: https://img.shields.io/npm/v/azure-products.svg
[npm-url]: https://www.npmjs.com/package/azure-products
[downloads-image]: https://img.shields.io/npm/dm/azure-products.svg
[standardjs-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg

## Install

```bash
npm install azure-products
```

## Usage

```js
const azureProducts = require('azure-products')

console.log(azureProducts)
//=> ['Academic Knowledge API', 'Access Control Service', 'Action Groups', ...]
```

And products with regions:

```js
const azureProducts = require('azure-products/detailed')

console.log(azureProducts)
//=> [ { name: 'Academic Knowledge API', regions: [ 'West US' ] }, { name: 'Access Control Service', regions: [...] }, ...]
```

## Known issues
* IoT Edge does not exist in detailed.json because Azure does not provide its status data.

## Update json files
```bash
node ./bin/fetch-products.js
node ./bin/fetch-products-detailed.js
```

## License

MIT. Copyright (C) [Halil İbrahim Şener](https://halilsener.com).
