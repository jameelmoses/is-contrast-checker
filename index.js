const Color = require('color');

const minimums = {
  aaa: 7,
  aa: 4.5,
  aaLarge: 3
};

module.exports = (colors) => {

  const colorResults = [];

  for (const [name, hex] of Object.entries(colors)) {

    const colorObject = Color(hex);

    const color = {
      name,
      hex: colorObject.hex(),
      labelColor: colorObject.isDark() ? 'white' : 'black',
      combinations: []
    };

    for (const [combinationName, combinationHex] of Object.entries(colors)) {

      const combColorObject = Color(combinationHex);

      const combination = {
        name: combinationName,
        hex: combColorObject.hex(),
        contrast: colorObject.contrast(combColorObject),
        get accessibility() {
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

    colorResults.push(color);
  }

  return colorResults;

};
