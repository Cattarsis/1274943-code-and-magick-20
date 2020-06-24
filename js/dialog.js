'use strict';

window.dialog = (function () {

  var CANVAS_WIDTH = 700;
  var CANVAS_HEIGHT = 300;
  var ALERT_POSITION_X = 0;
  var ALERT_POSITION_Y = 0;
  var ALERT_WIDTH = CANVAS_WIDTH - 20;
  var ALERT_HEIGHT = CANVAS_HEIGHT - 20;
  var ALERT_BACKGROUND_COLOR = '#fff';
  var TEXT_START_OFFSET_X = 15;
  var TEXT_START_OFFSET_Y = 25;
  var FONT_GAP = 20;

  var currentObj;
  var ctx;
  var startCoords;
  var dialogHandle;

  var userDialog = document.querySelector('.setup');

  var onPopupEscPress = function (evt) {

    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    currentObj.classList.remove('hidden');
    window.wizardGenerator.newWizards();

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    currentObj.classList.add('hidden');
    currentObj.style.top = '';
    currentObj.style.left = '';

    currentObj.querySelector('canvas').remove();

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    currentObj.style.top = (currentObj.offsetTop - shift.y) + 'px';
    currentObj.style.left = (currentObj.offsetLeft - shift.x) + 'px';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandle.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }
  };

  var errorAlert = function (err) {

    ctx = getContext(currentObj);
    window.util.renderCloud(ctx, ALERT_POSITION_X, ALERT_POSITION_Y, ALERT_WIDTH, ALERT_HEIGHT, ALERT_BACKGROUND_COLOR);
    window.util.printMultiLine(ctx, ALERT_POSITION_X + TEXT_START_OFFSET_X, ALERT_POSITION_Y + TEXT_START_OFFSET_Y, FONT_GAP, err);
  };

  var form = userDialog.querySelector('.setup-wizard-form');
  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorAlert);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);

  var getContext = function (obj) {
    var canvas = obj.querySelector('canvas');
    if (!canvas) {

      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      // canvas.style.zIndex = '2';
      canvas.style.top = 'calc(50% - ' + CANVAS_HEIGHT / 2 + 'px)';
      canvas.style.left = 'calc(50% - ' + CANVAS_WIDTH / 2 + 'px)';
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      // currentObj.insertBefore(canvas, currentObj.firstChild);
      currentObj.appendChild(canvas);
    }
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    return canvas.getContext('2d');
  };

  return {
    openBtnEventAdd: function (element, obj) {
      currentObj = obj;
      // ctx = getContext(obj);

      element.addEventListener('click', function () {
        openPopup(obj);
      });

      element.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, openPopup);
      });
    },
    closeBtnEventAdd: function (element, obj) {
      currentObj = obj;
      // ctx = getContext(obj);

      element.addEventListener('click', function () {
        closePopup(obj);
      });

      element.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closePopup);
      });
    },
    moveElementEventAdd: function (element, obj) {
      currentObj = obj;
      // ctx = getContext(obj);
      dialogHandle = element;

      element.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        dragged = false;
        startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },
    errorAlert: errorAlert

  };
})();
