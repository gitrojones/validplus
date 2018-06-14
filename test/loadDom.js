const { JSDOM } = require('jsdom')
let jsdom = new JSDOM()

module.exports = (documentLoaded) => {
  // Mock Image class since it's not found by default in jsdom
  global.Image = class Image {
    get complete() {
      return true
    }
  }

  global.navigator = {
    userAgent: 'node.js',
  }

  jsdom.env({
    html: '<html><head></head><body></body></html>',
    done: (err, win) => {
      global.window = win
      global.document = win.document

      // Add other common globals
      Object.keys(win).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          global[property] = win[property]
        }
      })

      // Done!
      documentLoaded()
    }
  })
}
