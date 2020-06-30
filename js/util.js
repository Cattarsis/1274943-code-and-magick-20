'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  var renderCloud = function (ctx, x, y, cloudWidth, cloudHeight, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cloudWidth, cloudHeight);
  };

  var printMultiLine = function (ctx, x, y, fontGap, str) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    var strs = str.split('\n');
    for (var i = 0; i < strs.length; i++) {
      ctx.fillText(strs[i], x, y + fontGap * i);
    }
    return strs.length;
  };

  var randomInt = function (num) {
    return Math.floor(Math.random() * num);
  };

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = randomInt(i + 1);
      var tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
  };

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getMaxElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    renderCloud: renderCloud,
    printMultiLine: printMultiLine,
    shuffle: shuffle,
    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
