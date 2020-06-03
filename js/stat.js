'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var BAR_WIDTH = 40;
var OFFSET_Y = GAP * 3 + FONT_GAP * 3;
var GISTOFFSET_X = GAP * 4;

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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');


  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP * 2);
  ctx.fillStyle = '#666';
  for (var i = 0; i < players.length; i++) {
    var saturation = Math.floor(Math.random() * 101);
    var currentTime = Math.round(times[i]);

    ctx.fillStyle = '#000';
    ctx.fillText(currentTime, CLOUD_X + GISTOFFSET_X + (BAR_WIDTH + BAR_MARGIN) * i, CLOUD_Y + OFFSET_Y + BAR_HEIGHT - GAP - BAR_HEIGHT * currentTime / maxTime);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + saturation + '%, 50%)';
    ctx.fillRect(CLOUD_X + GISTOFFSET_X + (BAR_WIDTH + BAR_MARGIN) * i, CLOUD_Y + OFFSET_Y + BAR_HEIGHT - BAR_HEIGHT * currentTime / maxTime, BAR_WIDTH, BAR_HEIGHT * currentTime / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GISTOFFSET_X + (BAR_WIDTH + BAR_MARGIN) * i, CLOUD_Y + OFFSET_Y + BAR_HEIGHT + GAP + FONT_GAP);
  }
};
