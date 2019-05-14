const Color = require('color');

// WCAG 2.0 Minimums
const minimums = {
  aa: 4.5,
  aaLarge: 3,
  aaa: 7,
  aaaLarge: 4.5
};

module.exports = (colors) => {

  // Array to store all results
  const colorResults = [];

  // Loop through colors with key and value
  for (const [key, value] of Object.entries(colors)) {

    // Individual color
    const color = {};

    // Color object from value
    const colorObject = Color(value);

    // Color's hex code
    color.hex = colorObject.hex();

    // Color's name
    color.name = key;

    // Color's label color
    color.labelColor = colorObject.isDark() ? 'white' : 'black';

    // Array to store all color's combinations
    color.combinations = [];

    // Loop through colors again with key and value
    for (const [key, value] of Object.entries(colors)) {

      // Individual combination
      const combination = {};

      // Color combination object from value
      const colorCombObject = Color(value);

      // Combination's hex code
      combination.hex = colorCombObject.hex();

      // Combination's name
      combination.name = key;

      // Combination's contrast ratio compared to each color
      combination.contrast = colorCombObject.contrast(color);

      // Default accessibility is to fail
      combination.accessibility = 'Fail';

      // Passes AAA contrast rules
      if (combination.contrast >= 7.0) {
        combination.accessibility = 'AAA';

        // Passes AA contrast rules
      } else if (combination.contrast >= 4.5) {
        combination.accessibility = 'AA';
        // Passes AA Large contrast rules
      } else if (combination.contrast >= 3.0) {
        combination.accessibility = 'AA18';
      }

      // Add combination to combinations array
      color.combinations.push(combination);
    }

    // Add all colors to results array
    colorResults.push(result);
  }

  return colorResults;

};
