'use strict'

var binary = require('tonal.set/binary')

/**
 * Create a dictionary
 *
 * The src is a hash map of keys associated to arrays. The array contains:
 *
 * - A interval list (as string or as array)
 * - (Optionally) an array of name aliases
 *
 * This function is exported in music.kit as ´dictionary´  (see example)
 *
 * @name dictionary.dictionary
 * @function
 * @param {Hash} src - the dictionary src
 * @return {Hash} the dictionary
 *
 * @example
 * var dictionary = require('music.dictionary/dictionary')
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
 * @example
 * var kit = require('music.kit')
 * // this function is exported as `dictionary` not `dictionary.dictionary`
 * kit.dictionary(...)
 */
module.exports = function (src) {
  function dict (key) { return dict.data[key] }
  dict.source = src
  dict.names = Object.keys(src)
  dict.aliases = dict.names.slice()
  dict.data = {}
  dict.names.forEach(function (n) {
    var s = { name: n, intervals: src[n][0].split(' '), aliases: src[n][1] || [] }
    s.binary = binary(s.intervals)
    s.decimal = parseInt(s.binary, 2)
    dict.data[n] = dict.data[s.binary] = dict.data[s.decimal] = s
    s.aliases.forEach(function (a) {
      dict.aliases.push(a)
      dict.data[a] = s
    })
  }, {})
  dict.source = src
  return dict
}
