require('jsdom-global')()

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

// noinspection TypeScriptValidateJSTypes
chai.use(chaiAsPromised)
