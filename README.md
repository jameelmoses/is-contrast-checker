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
  red: '#f00',
  green: '#008000',
  white: '#fff'
}

const result = isContrastChecker(colors)
```

Returns an array of colors with combinations for all other colors and their
[WCAG contrast](http://www.w3.org/TR/WCAG20/#visual-audio-contrast)
values.

```json
[
  {
    "hex": "#FF0000",
    "name": "red",
    "labelColor": "white",
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

MIT License
