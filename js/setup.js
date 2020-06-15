'use strict';

// var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
// var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
// var WIZARDS_COUNT = 4;

// var getRandomColor = function (colors) {
//   return colors[Math.floor(Math.random() * colors.length)];
// };

var getAnotherRandomColor = function (colors, currentColor) {
  var newColor = colors[Math.floor(Math.random() * colors.length)];
  while (newColor === currentColor) {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  }
  return newColor;
};

// var createWizard = function () {
//   var name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
//     + ' ' + LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
//   var coatColor = getRandomColor(COAT_COLORS);
//   var eyesColor = getRandomColor(EYES_COLORS);

//   return {name: name,
//     coatColor: coatColor,
//     eyesColor: eyesColor};
// };

// var createWizards = function (cnt) {
//   var wizards = [];
//   for (var i = 0; i < cnt; i++) {
//     wizards.push(createWizard());
//   }
//   return wizards;
// };

// var createDOMElement = function (templateWizard, wizard) {
//   var element = templateWizard.cloneNode(true);

//   element.querySelector('.setup-similar-label').textContent = wizard.name;
//   element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
//   element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

//   return element;
// };

// var createHTMLFragment = function (cnt, templateWizard) {
//   var wizards = createWizards(cnt);
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < wizards.length; i++) {
//     fragment.appendChild(createDOMElement(templateWizard, wizards[i]));
//   }

//   return fragment;
// };

// var showSetup = function () {
//   var setup = document.querySelector('.setup');
//   setup.classList.remove('hidden');

//   var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
//   var fragment = createHTMLFragment(WIZARDS_COUNT, wizardTemplate);

//   var similarList = document.querySelector('.setup-similar-list');
//   similarList.appendChild(fragment);

//   document.querySelector('.setup-similar').classList.remove('hidden');
// };


var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

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

var wiard = document.querySelector('.setup-wizard');

var setCoatColor = function (obj) {
  var color = getAnotherRandomColor(COAT_COLORS, obj.style.fill);
  obj.style.fill = color;
  document.querySelector('input[name=coat-color]').value = color;
};
var setEyesColor = function (obj) {
  var color = getAnotherRandomColor(EYES_COLORS, obj.style.fill);
  obj.style.fill = color;
  document.querySelector('input[name=eyes-color]').value = color;
};

wiard.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('wizard-coat')) {
    setCoatColor(evt.target);
  } else if (evt.target.classList.contains('wizard-eyes')) {
    setEyesColor(evt.target);
  }
});

var setFireballColor = function (obj) {
  var color = getAnotherRandomColor(FIREBALL_COLORS, obj.style.backgroundColor);
  obj.style.backgroundColor = color;
  document.querySelector('input[name=fireball-color]').value = color;
};

var fireball = document.querySelector('.setup-fireball-wrap');

fireball.addEventListener('click', function (evt) {
  if (evt.currentTarget.classList.contains('setup-fireball-wrap')) {
    setFireballColor(evt.currentTarget);
  }
});


