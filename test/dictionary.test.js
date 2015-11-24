var vows = require('vows')
var assert = require('assert')
var dictionary = require('..')

var chords = dictionary({'Maj7': ['1 3 5 7', ['maj7', 'M7']]})
vows.describe('dictionary.dictionary').addBatch({
  'get by name': function () {
    assert.deepEqual(chords('Maj7'), {
      name: 'Maj7',
      intervals: [ '1', '3', '5', '7' ],
      aliases: [ 'maj7', 'M7' ],
      binary: '100010010001',
      decimal: 2193
    })
  },
  'get by alias': function () {
    assert.deepEqual(chords('maj7'), chords('Maj7'))
    assert.deepEqual(chords('M7'), chords('Maj7'))
  }
}).export(module)
