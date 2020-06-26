'use strict';

window.wizardGenerator = (function () {
  // var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var WIZARDS_COUNT = 4;
  var wizards;

  // var createWizard = function () {
  //   var name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
  //     + ' ' + LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  //   var coatColor = window.colorize.getRandomColor(window.colorize.COAT_COLORS);
  //   var eyesColor = window.colorize.getRandomColor(window.colorize.EYES_COLORS);

  //   return {name: name,
  //     coatColor: coatColor,
  //     eyesColor: eyesColor};
  // };

  // var createWizards = function (cnt) {
  //   wizards = [];
  //   for (var i = 0; i < cnt; i++) {
  //     wizards.push(createWizard());
  //   }
  //   return wizards;
  // };

  var onWizardsLoad = function (data) {
    var tmpWizards = data.slice();
    window.util.shuffle(tmpWizards);
    wizards = tmpWizards.slice(0, WIZARDS_COUNT);

    var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var fragment = createHTMLFragment(WIZARDS_COUNT, wizardTemplate);

    var similarList = document.querySelector('.setup-similar-list');
    similarList.appendChild(fragment);
  };

  var createDOMElement = function (templateWizard, wizard) {
    var element = templateWizard.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return element;
  };

  var createHTMLFragment = function (cnt, templateWizard) {
    // var wizards = createWizards(cnt);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createDOMElement(templateWizard, wizards[i]));
    }

    return fragment;
  };

  var wiard = document.querySelector('.setup-wizard');

  var setCoatColor = function (obj) {
    var color = window.colorize.getAnotherRandomColor(window.colorize.COAT_COLORS, obj.style.fill);
    window.colorize.setColor(obj, color);
    document.querySelector('input[name=coat-color]').value = color;
  };
  var setEyesColor = function (obj) {
    var color = window.colorize.getAnotherRandomColor(window.colorize.EYES_COLORS, obj.style.fill);
    window.colorize.setColor(obj, color);
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
    var color = window.colorize.getAnotherRandomColor(window.colorize.FIREBALL_COLORS, obj.style.backgroundColor);
    window.colorize.setColor(obj, color);
    document.querySelector('input[name=fireball-color]').value = color;
  };

  var fireball = document.querySelector('.setup-fireball-wrap');

  fireball.addEventListener('click', function (evt) {
    if (evt.currentTarget.classList.contains('setup-fireball-wrap')) {
      setFireballColor(evt.currentTarget);
    }
  });

  return {
    newWizards: function () {
      if (!wizards || wizards.length === 0) {
        window.backend.load(onWizardsLoad, window.dialog.errorAlert);
      }

      document.querySelector('.setup-similar').classList.remove('hidden');
    }
  };
})();
