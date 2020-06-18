'use strict';

window.dialog = (function () {

  var currentObj;
  var startCoords;
  var dialogHandle;

  var onPopupEscPress = function (evt) {

    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    currentObj.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    currentObj.classList.add('hidden');
    currentObj.style.top = '';
    currentObj.style.left = '';

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

  return {
    openBtnEventAdd: function (element, obj) {
      currentObj = obj;
      element.addEventListener('click', function () {
        openPopup(obj);
      });

      element.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, openPopup);
      });
    },
    closeBtnEventAdd: function (element, obj) {
      currentObj = obj;
      element.addEventListener('click', function () {
        closePopup(obj);
      });

      element.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closePopup);
      });
    },
    moveElementEventAdd: function (element, obj) {
      currentObj = obj;
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
    }

  };
})();
