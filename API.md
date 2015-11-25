## `dictionary`

Create a dictionary from a source.

The source is a hash map of keys associated to arrays. The array contains:

- A interval list (as string or as array)
- (Optionally) an array of name aliases

### Parameters

* `src` **`Hash`** the dictionary src


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
```

Returns `Hash` the dictionary


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


