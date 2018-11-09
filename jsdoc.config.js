'use strict'

module.exports = {
  'plugins': [
    'node_modules/jsdoc-vuejs'
  ],
  'recurseDepth': 10,
  'source': {
    'includePattern': '.+\\.(js(doc|x)|vue)?$',
    'excludePattern': '(^|\\/|\\\\)_'
  },
  'sourceType': 'module',
  'tags': {
    'allowUnknownTags': true,
    'dictionaries': ['jsdoc','closure']
  },
  'templates': {
    'cleverLinks': false,
    'monospaceLinks': false
  }
}
