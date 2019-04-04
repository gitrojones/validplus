require('jsdom-global')()

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const sinon = require('sinon')

chai.use(chaiAsPromised)

global._ = _
global.fs = fs
global.path = path
global.expect = chai.expect
global.sinon = sinon
