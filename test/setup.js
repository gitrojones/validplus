require('jsdom-global')()

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const expect = require('chai').expect
const sinon = require('sinon')

global._ = _
global.fs = fs
global.path = path
global.expect = expect
global.sinon = sinon
