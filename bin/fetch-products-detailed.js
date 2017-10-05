const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
  uri: 'https://azure.microsoft.com/en-us/status/',
  transform: function (body) {
    return cheerio.load(body)
  }
}

rp(options)
  .then(function ($) {
    return getDetailedProducts($)
  })
  .then(function (products) {
    fs.writeFileSync('./azure-products-detailed.json', JSON.stringify(products, null, 2), 'utf-8')
  })
  .catch(function (err) {
    console.error(err)
  })

function getDetailedProducts ($) {
  let products = {}

  $('body').find('.region-status-table').each(function () {
    let regions = []

    // fill regions from thead
    $(this).find('th').each(function () {
      regions.push($(this).text().replace('*', ''))
    })

    // fill products
    $(this).find('tr').not('.status-category').each(function () {
      let regionIndex = 0
      let currentProduct = $(this).find('td').first().text()

      $(this).find('td').each(function () {
        if ($(this).hasClass('status-cell')) {
          if (!products[currentProduct]) {
            products[currentProduct] = {
              name: currentProduct,
              regions: []
            }
          }

          if (products[currentProduct].regions.indexOf(regions[regionIndex]) === -1) {
            products[currentProduct].regions.push(regions[regionIndex])
          }
        }
        regionIndex++
      })
    })
  })

  return Object.keys(products).map(key => products[key]).sort(function (a, b) {
    return a.name.localeCompare(b.name)
  })
}
