'use strict';
(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var setupDrag = setup.querySelector('.upload');
  var setupAvatarInpu = setup.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  window.dialog.openBtnEventAdd(setupOpen, setup);
  window.dialog.closeBtnEventAdd(setupClose, setup);
  window.dialog.moveElementEventAdd(setupDrag, setup);
  window.util.addLoadImageHandler(setupAvatarInpu, preview);

  var userNameInput = document.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < userNameInput.minLength) {
      userNameInput.setCustomValidity('Ещё ' + (userNameInput.minLength - valueLength) + ' симв.');
    } else if (valueLength > userNameInput.maxLength) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - userNameInput.maxLength) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

})();


