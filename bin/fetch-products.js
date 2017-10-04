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
    $('#wa-dropdown-service option').each(function () {
      products.push($(this).text())
    })
    products.shift()
    return products
  })
  .then(function (products) {
    fs.writeFileSync('./azure-products.json', JSON.stringify(products, null, 2), 'utf-8')
  })
  .catch(function (err) {
    console.error(err)
  })
