'use strict'

var dictionary = require('./dictionary')
var binary = require('tonal.set/binary')
var split = require('tonal.gamut/split')

/**
 * Get a function to perform an inverse dictionary lookup (given notes, return names)
 *
 * @name dictionary.names
 * @function
 * @param {Array} names - the list of all names
 * @param {Hash} dictionary - the dictionary
 * @param {Function} builder - the name builder
 * @return {Function} a function to perform inverse lookup
 */
module.exports = function (d, sep) {
  var dict = typeof d === 'function' ? d : dictionary(d)
  sep = sep || ''
  return function (notes) {
    if (arguments.length === 0 || notes === false) return dict.names.slice()
    else if (notes === true) return dict.aliases.slice()
    var s = dict(binary(notes))
    if (!s) return []
    var tonic = split(notes)[0]
    return [ s.name ].concat(s.aliases).map(function (name) {
      return tonic + sep + name
    })
  }
}
