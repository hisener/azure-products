const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
  uri: 'https://azure.microsoft.com/en-us/status/history/',
  transform: function (body) {
    return cheerio.load(body)
  }
}

rp(options)
  .then(function ($) {
    let products = []
    $('#wa-dropdown-service').find('option').each(function () {
      let product = removeUnnecessaryWords($(this).text())
      if (products.indexOf(product) === -1) {
        products.push(product)
      }
    })
    products.shift()
    return products.sort()
  })
  .then(function (products) {
    fs.writeFileSync('./azure-products.json', JSON.stringify(products, null, 2), 'utf-8')
  })
  .catch(function (err) {
    console.error(err)
  })

function removeUnnecessaryWords (str) {
  if (str.indexOf('Azure') === 0) {
    return str.substr(str.indexOf(' ') + 1)
  }
  return str
}
