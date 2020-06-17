'use strict';

window.colorize = (function () {
  var COAT_COLORS = ['rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  return {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    getRandomColor: function (colors) {
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getAnotherRandomColor: function (colors, currentColor) {
      var newColor = colors[Math.floor(Math.random() * colors.length)];
      while (newColor === currentColor) {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      }
      return newColor;
    },
    setColor: function (element, color) {
      switch (element.tagName.toLowerCase()) {
        case 'div':
          element.style.backgroundColor = color;
          break;
        default:
          element.style.fill = color;
          break;
      }
    }
  };
})();
