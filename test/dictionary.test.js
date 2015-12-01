var vows = require('vows')
var assert = require('assert')
var dictionary = require('..')

vows.describe('tonal.dictionary').addBatch({
  'basic dictionary': {
    'topic': function () {
      return dictionary({'Maj7': ['1 3 5 7', ['maj7', 'M7']]})
    },
    'get by type and tonic': function (chords) {
      assert.deepEqual(chords('Maj7', 'C'), ['C', 'E', 'G', 'B'])
      assert.deepEqual(chords('M7', 'C'), ['C', 'E', 'G', 'B'])
      assert.deepEqual(chords('maj7', 'C'), ['C', 'E', 'G', 'B'])
    },
    'type with pitch class': function (chords) {
      assert.deepEqual(chords('BbMaj7'), [ 'Bb', 'D', 'F', 'A' ])
      assert.deepEqual(chords('BbM7'), [ 'Bb', 'D', 'F', 'A' ])
      assert.deepEqual(chords('Bbmaj7'), [ 'Bb', 'D', 'F', 'A' ])
    },
    'type with note': function (chords) {
      assert.deepEqual(chords('Eb3Maj7'), [ 'Eb3', 'G3', 'Bb3', 'D4' ])
      assert.deepEqual(chords('Eb3M7'), [ 'Eb3', 'G3', 'Bb3', 'D4' ])
      assert.deepEqual(chords('Eb3maj7'), [ 'Eb3', 'G3', 'Bb3', 'D4' ])
    },
    'get intervals': function (chords) {
      assert.deepEqual(chords('Maj7', false), [ '1P', '3M', '5P', '7M' ])
      assert.deepEqual(chords('CMaj7', false), [ '1P', '3M', '5P', '7M' ])
    },
    'without tonic': function (chords) {
      assert.deepEqual(chords('Maj7')('G'), [ 'G', 'B', 'D', 'F#' ])
    },
    'invalid values': function (chords) {
      assert.deepEqual(chords('Cblah'), [])
      assert.deepEqual(chords('blah'), [])
      assert.deepEqual(chords(), [])
    }
  }
}).export(module)
