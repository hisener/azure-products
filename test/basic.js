const test = require('tape')
const azureProducts = require('../')

test('`azure-products` is an array of product', function (t) {
  t.true(Array.isArray(azureProducts))
  t.true(azureProducts.length > 100 && azureProducts.length < 1000)

  t.end()
})
