var vows = require('vows')
var assert = require('assert')
var dictionary = require('..')

vows.describe('tonal.dictionary properties').addBatch({
  'no aliases': function () {
    var d = dictionary({'m': ['1 3b 5'], 'M': ['1 3 5']})
    assert.deepEqual(d.names, ['m', 'M'])
    assert.deepEqual(d.aliases, ['m', 'M'])
  },
  'data': {
    'topic': function () {
      return dictionary({'Maj7': ['1 3 5 7', ['maj7', 'M7']]})
    },
    'get by name': function (chords) {
      assert.deepEqual(chords.data['Maj7'], {
        name: 'Maj7',
        intervals: [ '1', '3', '5', '7' ],
        steps: [ [ 0, 0 ], [ 4, -2 ], [ 1, 0 ], [ 5, -2 ] ],
        aliases: [ 'maj7', 'M7' ],
        binary: '100010010001',
        decimal: 2193
      })
    },
    'get by alias': function (chords) {
      assert.deepEqual(chords['maj7'], chords['Maj7'])
      assert.deepEqual(chords['M7'], chords['Maj7'])
    },
    'get names': function (chords) {
      assert.deepEqual(chords.names, [ 'Maj7' ])
    },
    'get names with aliases': function (chords) {
      assert.deepEqual(chords.aliases, [ 'Maj7', 'maj7', 'M7' ])
    }
  }
}).export(module)
