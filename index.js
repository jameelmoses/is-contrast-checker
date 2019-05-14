var _ = require('lodash');
var Color = require('color');

var minimums = {
  aa: 4.5,
  aaLarge: 3,
  aaa: 7,
  aaaLarge: 4.5
};

module.exports = function(colors, options) {

  var arr = [];
  var results = [];
  var combinations = [];

  var options = options || {};

  _.defaults(options, {
    threshold: 0,
    compact: false,
    uniq: true
  });

  if (!Array.isArray(colors)) {

    if (typeof colors === 'object') {

      _.forIn(colors, (val, key) => {
        var color = Color(val);
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

    colors.forEach(function(color) {
      arr.push(Color(color));
    });
  }

  arr.forEach(function(color) {
    var result = options.compact ? {} : _.clone(color);

    result.hex = color.hex();

    if (color.name) {
      result.name = color.name;
    }

    result.labelColor = getLabelColor(color.hex());

    result.combinations = [];

    arr.forEach(function(bg) {

      if (color === bg) {
        return false;
      }

      var combination = options.compact ? {} : _.clone(bg);

      combination.hex = bg.hex();

      if (bg.name) {
        combination.name = bg.name;
      }

      combination.contrast = color.contrast(bg);
      combination.accessibility = 'Fail';
      if (combination.contrast >= 7.0) {
        combination.accessibility = 'AAA';
      } else if (combination.contrast >= 4.5) {
        combination.accessibility = 'AA';
      } else if (combination.contrast >= 3.0) {
        combination.accessibility = 'AA18';
      }

      if (combination.contrast > options.threshold) {
        result.combinations.push(combination);
      }

    });

    results.push(result);
  });

  function getLabelColor(hexcolor){
  	var r = parseInt(hexcolor.substr(1, 2), 16);
  	var g = parseInt(hexcolor.substr(3, 2), 16);
  	var b = parseInt(hexcolor.substr(5, 2), 16);
  	var yiq = ((r * 299) + (g * 587)+ (b * 114)) / 1000;
  	return (yiq >= 128) ? 'black' : 'white';
  }

  return results;

};
