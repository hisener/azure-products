const test = require('tape')
const azureProducts = require('../')
const azureDetailedProducts = require('../detailed')

test('`azure-products` is an array of product', function (t) {
  t.true(Array.isArray(azureProducts))
  t.true(azureProducts.length > 100 && azureProducts.length < 1000)

  t.end()
})

test('`azure-products/detailed` is an array of detailed product', function (t) {
  t.true(Array.isArray(azureDetailedProducts))
  t.true(azureDetailedProducts.length > 100 && azureDetailedProducts.length < 1000)

  t.true(azureDetailedProducts[0].hasOwnProperty('name'))
  t.true(azureDetailedProducts[0].hasOwnProperty('regions'))
  t.true(Array.isArray(azureDetailedProducts[0].regions))
  t.equal(typeof azureDetailedProducts[0].regions[0], 'string')

  t.end()
})
