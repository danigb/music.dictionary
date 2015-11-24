var vows = require('vows')
var assert = require('assert')
var dictionary = require('..')

var names = dictionary.names({'Maj7': ['1 3 5 7', ['maj7', 'M7']]}, ':')
vows.describe('dictionary.names').addBatch({
  'get names': function () {
    assert.deepEqual(names(), ['Maj7'])
    assert.deepEqual(names(false), ['Maj7'])
  },
  'get names with aliases': function () {
    assert.deepEqual(names(true), [ 'Maj7', 'maj7', 'M7' ])
  },
  'get name by notes': function () {
    assert.deepEqual(names('C E G B'), [ 'C:Maj7', 'C:maj7', 'C:M7' ])
  },
  'default separator is empty': function () {
    var names = dictionary.names({'m': ['1 3b 5']})
    assert.equal(names('F Ab C'), 'Fm')
  }
}).export(module)
