# IS Contrast Checker

Take a set color palette and get contrast values for every possible combination –
useful for finding safe color combinations with predefined colors
and includes pass/fail scores for the
[WCAG accessibility guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).

## Getting Started

```bash
yarn add is-contrast-checker
```

## Usage

Pass an array of color strings or an object with color strings as values.

```js
import isContrastChecker from 'is-contrast-checker';

const colors = {
  red: '#FF0000',
  green: '#008000',
  white: '#FFFFFF'
}

const result = isContrastChecker(colors, { compact: true, threshold: 0 })
```

Returns an array of colors with combinations for all other colors and their
[WCAG contrast](http://www.w3.org/TR/WCAG20/#visual-audio-contrast)
values.

```json
[
  {
    "hex": "#FF0000",
    "name": "red",
    "combinations": [
      {
        "hex": "#008000",
        "name": "green",
        "contrast": 1.28483997166146,
        "accessibility": "Fail"
      },
      {
        "hex": "#FFFFFF",
        "name": "white",
        "contrast": 3.9984767707539985,
        "accessibility": "AA18"
      }
    ]
  },
  ...
]
```

---

## Options

### `compact`

_Type: Boolean (default: `false`)_

If set to `true`, the result will be a smaller object that only includes hex value color strings, a name for each color (if an object is passed to the function), contrast, and accessibility values.
When set to `false`, the result also includes the entire [harthur/color](https://www.npmjs.com/package/color) object for each color, which includes other properties and methods for color manipulation.

### `threshold`

_Type: Number (default: `0`)_

When set, the colorable function only returns combinations that have a contrast above this value. This is useful for only seeing combinations that pass a minimum contrast level.

### `uniq`

_Type: Boolean (default: true)_

When set to `true`, the array of colors is passed through lodash.uniq to remove duplicates.


---

MIT License
