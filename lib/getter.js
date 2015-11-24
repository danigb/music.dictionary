'use strict'

var dictionary = require('./dictionary')
var transpose = require('tonal.transpose')
var parse = require('tonal.notation/np')

/**
 * Given a dictionary return a function to get the notes or intervals from it
 *
 * @name dictionary.getter
 * @function
 * @param {Function|Hash} dictionary - the dictionary function or data
 * @return {Function} a function to get the notes or intervals from the set dictionary
 * @see scale.get
 * @see chord.get
 *
 * @example
 * var d = dictionary({'Maj7': ['1 3 5 7'], 'm7': ['1 3b 5 7b'] })
 * var get = getter(d)
 * get('CMaj7') // => ['C', 'E', 'G', 'B']
 */
module.exports = function (d) {
  var dict = typeof d === 'function' ? d : dictionary(d)
  return function get (name, tonic) {
    var v = dict(name)
    if (!v) {
      var n = parse(name)
      v = n ? dict(n[5]) : null
      if (!v) return []
      tonic = tonic || n[1] + n[2] + n[3]
    }
    if (!tonic) return function (t) { return get(name, t) }
    return v.intervals.map(transpose(tonic))
  }
}
