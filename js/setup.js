'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var createWizard = function () {
  var name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    + ' ' + LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  var coatColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
  var eyesColor = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];

  return {name: name,
    coatColor: coatColor,
    eyesColor: eyesColor};
};

var createWizards = function (cnt) {
  var wizards = [];
  for (var i = 0; i < cnt; i++) {
    wizards.push(createWizard());
  }
  return wizards;
};

var createDOMElement = function (templateWizard, wizard) {
  var element = templateWizard.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return element;
};

var createHTMLFragment = function (cnt, templateWizard) {
  var wizards = createWizards(cnt);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createDOMElement(templateWizard, wizards[i]));
  }

  return fragment;
};

var showSetup = function () {
  var setup = document.querySelector('.setup');
  setup.classList.remove('hidden');

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = createHTMLFragment(WIZARDS_COUNT, wizardTemplate);

  var similarList = document.querySelector('.setup-similar-list');
  similarList.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');
};


showSetup();
