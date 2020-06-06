'use strict';

let FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
let LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
let COAT_COLORS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
let EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

let createWizard = function() {
  let name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    + ' ' + LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  let coatColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
  let eyesColor = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];

  return {name: name,
    coatColor: coatColor,
    eyesColor: eyesColor};
};

let createWizards = function(cnt) {
  let wizards = [];
  for (let i = 0; i < cnt; i++){
    wizards.push(createWizard());
  }
  return wizards;
};

let createDOM_Element = function(templateWizard, wizard) {
  const element = templateWizard.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return element;
}

let createHTML_Fragment = function (cnt, templateWizard) {
  let wizards = createWizards(cnt);
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(createDOM_Element(templateWizard, wizards[i]));
  }

  return fragment;
}

let showSetup = function() {
  let setup = document.querySelector('.setup');
  setup.classList.remove('hidden');

  let wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  let fragment = createHTML_Fragment(4, wizardTemplate);

  let similarList = document.querySelector('.setup-similar-list');
  similarList.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');
}


showSetup();
