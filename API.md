## `dictionary`

Create a dictionary from a hash of names to intervals.

The dictionary if a function that returns a data object from a given name.
The returned data object has the following properties:

- name: the name
- aliases: an array with the alternative names
- intervals: an array with the intervals
- steps: an array with the intervals in __array notation__
- binary: a binary representation of the set
- decimal: the decimal representation of the set

The dictionary itself has a `names` property with an array of available
names, and `aliases` property with an array of all names and aliases.

The data source is a hash map of keys associated to intervals list, and optionally
an array of alternatives names:

- A interval list (as string or as array)
- (Optionally) an array of name aliases

See [chord.dictionary](https://github.com/danigb/chord.dictionary)

### Parameters

* `src` **`Hash`** the data source


### Examples

```js
var dictionary = require('tonal.dictionary')
var chords = dictionary({'Maj7': ['1 3 5 7', ['maj7', 'M7']]})

// get chord by name
chords('Maj7') // => { name: 'Maj7', aliases: ['maj7', 'M7'],
               //      intervals: ['1', '3', '5', '7'] }

// get chord by aliases
chords('Maj7') === chords('maj7') === chords('M7')

// get chord by binary numbers
chords('100010010001') === chords(22193) === chords('Maj7')

// get chord names
chords.names // => ['Maj7']
```

Returns `Function` the dictionary


## `dictionary.getter`

Given a dictionary return a function to get the notes or intervals from it

### Parameters

* `dictionary` **`Function or Hash`** the dictionary function or data


### Examples

```js
var getter = require('tonal.dictionary/getter')
var get = getter({'Maj7': ['1 3 5 7'], 'm7': ['1 3b 5 7b'] })
get('CMaj7') // => ['C', 'E', 'G', 'B']
```

Returns `Function` a function to get the notes or intervals from the set dictionary


## `dictionary.names`

Get a function to perform an inverse dictionary lookup (given notes, return names)

### Parameters

* `names` **`Array`** the list of all names
* `dictionary` **`Hash`** the dictionary
* `builder` **`Function`** the name builder



Returns `Function` a function to perform inverse lookup


