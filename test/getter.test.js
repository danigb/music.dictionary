var vows = require('vows')
var assert = require('assert')
var dictionary = require('..')

var chords = dictionary.getter({'Maj7': ['1 3 5 7', ['maj7', 'M7']]})
vows.describe('dictionary.getter').addBatch({
  'create getter from data': function () {
    assert.deepEqual(dictionary.getter({'m': ['1 3b 5']})('Fm'), [ 'F', 'Ab', 'C' ])
  },
  'create a getter from a dictionary': function () {
    assert.deepEqual(dictionary.getter(dictionary({'m': ['1 3b 5']}))('Bm'), [ 'B', 'D', 'F#' ])
  },
  'get by type and tonic': function () {
    assert.deepEqual(chords('Maj7', 'C'), ['C', 'E', 'G', 'B'])
    assert.deepEqual(chords('M7', 'C'), ['C', 'E', 'G', 'B'])
    assert.deepEqual(chords('maj7', 'C'), ['C', 'E', 'G', 'B'])
  },
  'type with pitch class': function () {
    assert.deepEqual(chords('BbMaj7'), [ 'Bb', 'D', 'F', 'A' ])
    assert.deepEqual(chords('BbM7'), [ 'Bb', 'D', 'F', 'A' ])
    assert.deepEqual(chords('Bbmaj7'), [ 'Bb', 'D', 'F', 'A' ])
  },
  'type with note': function () {
    assert.deepEqual(chords('Eb3Maj7'), [ 'Eb3', 'G3', 'Bb3', 'D4' ])
    assert.deepEqual(chords('Eb3M7'), [ 'Eb3', 'G3', 'Bb3', 'D4' ])
    assert.deepEqual(chords('Eb3maj7'), [ 'Eb3', 'G3', 'Bb3', 'D4' ])
  },
  'without tonic': function () {
    assert.deepEqual(chords('Maj7')('G'), [ 'G', 'B', 'D', 'F#' ])
  }
}).export(module)
