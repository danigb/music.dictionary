'use strict'

var parse = require('tonal.notation/interval.parse')

/**
 * Create a dictionary from a hash of names to intervals.
 *
 * The dictionary if a function that returns a data object from a given name.
 * The returned data object has the following properties:
 *
 * - name: the name
 * - aliases: an array with the alternative names
 * - intervals: an array with the intervals
 * - steps: an array with the intervals in __array notation__
 * - binary: a binary representation of the set
 * - decimal: the decimal representation of the set
 *
 * The dictionary itself has a `names` property with an array of available
 * names, and `aliases` property with an array of all names and aliases.
 *
 * The data source is a hash map of keys associated to intervals list, and optionally
 * an array of alternatives names:
 *
 * - A interval list (as string or as array)
 * - (Optionally) an array of name aliases
 *
 * See [chord.dictionary](https://github.com/danigb/chord.dictionary)
 *
 * @name dictionary
 * @function
 * @param {Hash} src - the data source
 * @return {Function} the dictionary
 *
 * @example
 * var dictionary = require('tonal.dictionary')
 * var chords = dictionary({'Maj7': ['1 3 5 7', ['maj7', 'M7']]})
 *
 * // get chord by name
 * chords('Maj7') // => { name: 'Maj7', aliases: ['maj7', 'M7'],
 *                //      intervals: ['1', '3', '5', '7'] }
 *
 * // get chord by aliases
 * chords('Maj7') === chords('maj7') === chords('M7')
 *
 * // get chord by binary numbers
 * chords('100010010001') === chords(22193) === chords('Maj7')
 *
 * // get chord names
 * chords.names // => ['Maj7']
 */
module.exports = function (src) {
  function dict (key) { return dict.data[key] }
  dict.source = src
  dict.names = Object.keys(src)
  dict.aliases = dict.names.slice()
  var data = dict.data = {}

  dict.names.forEach(function (k) {
    var d = src[k]
    var c = { name: k, aliases: d[1] || [] }
    c.intervals = d[0].split(' ')
    c.steps = c.intervals.map(parse)
    c.binary = binary([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], c.steps)
    c.decimal = parseInt(c.binary, 2)
    data[k] = data[c.binary] = data[c.decimal] = c
    c.aliases.forEach(function (a) { data[a] = c })
    if (c.aliases.length > 0) dict.aliases = dict.aliases.concat(c.aliases)
  })
  return dict
}

function binary (num, intervals) {
  intervals.forEach(function (i) { num[(i[0] * 7 + i[1] * 12) % 12] = '1' })
  return num.join('')
}
