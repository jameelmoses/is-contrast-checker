import _ from 'lodash';
import Color from 'color';

const minimums = {
  aa: 4.5,
  aaLarge: 3,
  aaa: 7,
  aaaLarge: 4.5
};

export default (colors, options) => {

  const arr = [];
  const results = [];
  const combinations = [];

  const options = options || {};

  _.defaults(options, {
    threshold: 0,
    compact: false,
    uniq: true
  });

  if (!Array.isArray(colors)) {
    if (typeof colors === 'object') {
      _.forIn(colors, (val, key) => {
        const color = Color(val);
        color.name = key;
        arr.push(color);
      });
      if (options.uniq) {
        arr = _.uniq(arr);
      }
    } else {
      console.error('Must provide an array or object');
      return false;
    }
  } else {
    if (options.uniq) {
      colors = _.uniq(colors);
    }
    colors.forEach((color) => {
      arr.push(Color(color));
    });
  }

  arr.forEach((color) => {
    const result = options.compact ? {} : _.clone(color);
    result.hex = color.hexString();
    if (color.name) { result.name = color.name; }
    result.combinations = [];
    result.labelColor = getLabelColor(color.hexString());
    arr.forEach(function(bg) {

      if (color === bg) {
        return false;
      }

      const combination = options.compact ? {} : _.clone(bg);

      combination.hex = bg.hexString();

      if (bg.name) {
        combination.name = bg.name;
      }

      combination.contrast = color.contrast(bg);
      if (combination.contrast >= 7.0) {
        combination.accessibility = "AAA";
      } else if (combination.contrast >= 4.5) {
        combination.accessibility = "AA";
      } else if (combination.contrast >= 3.0) {
        combination.accessibility = "AA18";
      }

      if (combination.contrast > options.threshold) {
        result.combinations.push(combination);
      }

    });

    results.push(result);
  });

  function getLabelColor(hexcolor){
  	const r = parseInt(hexcolor.substr(1, 2), 16);
  	const g = parseInt(hexcolor.substr(3, 2), 16);
  	const b = parseInt(hexcolor.substr(5, 2), 16);
  	const yiq = ((r * 299) + (g * 587)+ (b * 114)) / 1000;
  	return (yiq >= 128) ? 'black' : 'white';
  }

  return results;

};
