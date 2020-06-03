'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var BAR_WIDTH = 40;
var GISTOFFSET_Y = 50;
var GISTOFFSET_X = 40;
var CAPTIONOFFSET_X = 20;
var CAPTIONOFFSET_Y = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var printMultiLine = function (ctx, x, y, str) {
  var strs = str.split('\n');
  for (var i = 0; i < strs.length; i++) {
    ctx.fillText(strs[i], x, y + FONT_GAP * i);
  }
  return strs.length;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');


  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  var printedLines = printMultiLine(ctx, CLOUD_X + CAPTIONOFFSET_X, CLOUD_Y + CAPTIONOFFSET_Y + FONT_GAP, 'Ура вы победили!\nСписок результатов:');

  ctx.fillStyle = '#666';
  for (var i = 0; i < players.length; i++) {
    var saturation = Math.floor(Math.random() * 101);
    var currentTime = Math.round(times[i]);
    var color = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + saturation + '%, 50%)';

    drowGist(ctx, currentTime, maxTime, CLOUD_X + GISTOFFSET_X, CLOUD_Y + GISTOFFSET_Y + printedLines * FONT_GAP, i, players[i], color);
  }
};

var drowGist = function (ctx, currenValue, maxValue, x, y, number, title, color) {
  ctx.fillStyle = '#000';
  ctx.fillText(currenValue, x + (BAR_WIDTH + BAR_MARGIN) * number, y + BAR_HEIGHT - GAP - BAR_HEIGHT * currenValue / maxValue);

  ctx.fillStyle = color;
  ctx.fillRect(x + (BAR_WIDTH + BAR_MARGIN) * number, y + BAR_HEIGHT - BAR_HEIGHT * currenValue / maxValue, BAR_WIDTH, BAR_HEIGHT * currenValue / maxValue);

  ctx.fillStyle = '#000';
  ctx.fillText(title, x + (BAR_WIDTH + BAR_MARGIN) * number, y + BAR_HEIGHT + FONT_GAP);
};
