const Color = require('color');

const minimums = {
  aaa: 7,
  aa: 4.5,
  aaLarge: 3
};

module.exports = (colors) => {

  const colorResults = [];

  for (const [key, value] of Object.entries(colors)) {

    const colorObject = Color(value);

    const color = {
      name: key,
      hex: colorObject.hex(),
      labelColor: colorObject.isDark() ? 'white' : 'black',
      combinations: []
    };

    for (const [key, value] of Object.entries(colors)) {

      const combination = {
        name: key,
        hex: colorObject.hex(),
        contrast: colorObject.contrast(color),
        accessibility: () => {
          const { aaa, aa, aaLarge } = minimums;
          if (this.contrast >= aaa) {
            return 'AAA';
          } else if (this.contrast >= aa) {
            return 'AA';
          } else if (this.contrast >= aaLarge) {
            return 'AA18';
          } else {
            return 'Fail';
          }
        }
      };

      color.combinations.push(combination);
    }

    colorResults.push(result);
  }

  return colorResults;

};
