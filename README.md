# tonal.dictionary

[![Build Status](https://travis-ci.org/danigb/tonal.svg?branch=master)](https://travis-ci.org/danigb/tonal.dictionary)
[![Code Climate](https://codeclimate.com/github/danigb/tonal.dictionary/badges/gpa.svg)](https://codeclimate.com/github/danigb/tonal.dictionary)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://img.shields.io/npm/v/tonal.dictionary.svg)](https://www.npmjs.com/package/tonal.dictionary)
[![license](https://img.shields.io/npm/l/tonal.dictionary.svg)](https://www.npmjs.com/package/tonal.dictionary)
[![tonal](https://img.shields.io/badge/lib-tonal-yellow.svg)](https://www.npmjs.com/package/tonal)


`tonal.dictionary` is a collection of functions to create and manipulate tonal dictionaries. A tonal dictionary is a collection of notes with a name:

```js
var dictionary = require('tonal.dictionary')
var chords = dictionary.getter({'Maj7': ['1 3 5 7', ['maj7', 'M7']]})
chords('CMaj7') // => ['C', 'E', 'G', 'B']
chords('BbM7') // => ['Bb', 'D', 'F', 'A']
```

This is part of [tonal](https://www.npmjs.com/package/tonal) and the foundation of the [tonal.scale](https://github.com/danigb/tonal.scale) and [tonal.chord](https://github.com/danigb/tonal.chord) dictionaries.

## Install

Via npm only: `npm i --save tonal.dictionary`

## Usage

#### Create a dictionary

The `dictionary` function creates a function that returns interval collection that can be accessed by name, name aliases, binary set number and decimal set number.


```js
var chords = dictionary({'Maj7', ['1 3 5 7', ['maj7', 'M7']]})
// get chord by name
chords('Maj7') // => { name: 'Maj7', aliases: ['maj7', 'M7'],
               //      intervals: ['1', '3', '5', '7'] }

// get chord by aliases
chords('Maj7') === chords('maj7') === chords('M7')

// get chord by binary numbers
chords('100010010001') === chords(2193) === chords('Maj7')
```

#### Create a getter

The more convenient function is `dictionary.getter` that returns a function that accepts a tonic:

```js
var chords = dictionary.getter({'Maj7', ['1 3 5 7', ['maj7', 'M7']]})
chords('CMaj7') // => ['C', 'E', 'G', 'B']
chords('Maj7', 'C') // => ['C', 'E', 'G', 'B']
```

#### Reverse lookup

The `dictionary.names` function returns a function that, given a collection of notes, return the name:

```js
var names = dictionary.names({'Maj7', ['1 3 5 7', ['maj7', 'M7']]})
names('Eb G Bb D') // => ['EbMaj7', 'Ebmaj7', 'EbM7']
```

The first name is always the principal name and the rest is the aliases.

#### Get dictionary keys

The function returned by `dictionary.names` returns the available names if invoked without arguments (or false as argument):

```js
var names = dictionary.names({'Maj7', ['1 3 5 7', ['maj7', 'M7']]})
names() // => ['Maj7']
names(false) // => ['Maj7']
```

If `true` is passed, the names and the aliases are returned:

```js
names(true) // => ['Maj7', 'maj7', 'M7']
```

#### More...

Read the [generated documentation](https://github.com/danigb/tonal.dictionary/blob/master/API.md) or take a look at [tonal](https://www.npmjs.com/package/tonal)

## License

MIT License
