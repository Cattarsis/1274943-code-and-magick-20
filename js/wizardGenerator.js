'use strict';

window.wizardGenerator = (function () {

  var WIZARDS_COUNT = 4;
  var wizards;
  var eyesColor;
  var coatColor;
  var fireballColor;

  var onWizardsLoad = function (data) {
    wizards = data;
    wizardUpdate();
  };

  var render = function (data) {
    var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var fragment = createHTMLFragment(data, wizardTemplate);

    var similarList = document.querySelector('.setup-similar-list');
    similarList.innerHTML = '';
    similarList.appendChild(fragment);
  };

  var wizardUpdate = function () {
    render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    })
    .slice(0, WIZARDS_COUNT));
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var createDOMElement = function (templateWizard, wizard) {
    var element = templateWizard.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return element;
  };

  var createHTMLFragment = function (data, templateWizard) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(createDOMElement(templateWizard, data[i]));
    }

    return fragment;
  };

  var wiard = document.querySelector('.setup-wizard');

  var onColorChange = window.util.debounce(function () {
    wizardUpdate();
  });

  var setCoatColor = function (obj) {
    coatColor = window.colorize.getAnotherRandomColor(window.colorize.COAT_COLORS, coatColor);
    window.colorize.setColor(obj, coatColor);
    document.querySelector('input[name=coat-color]').value = coatColor;
    onColorChange();
  };
  var setEyesColor = function (obj) {
    eyesColor = window.colorize.getAnotherRandomColor(window.colorize.EYES_COLORS, eyesColor);
    window.colorize.setColor(obj, eyesColor);
    document.querySelector('input[name=eyes-color]').value = eyesColor;
    onColorChange();
  };

  wiard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('wizard-coat')) {
      setCoatColor(evt.target);
    } else if (evt.target.classList.contains('wizard-eyes')) {
      setEyesColor(evt.target);
    }
  });

  var setFireballColor = function (obj) {
    fireballColor = window.colorize.getAnotherRandomColor(window.colorize.FIREBALL_COLORS, fireballColor);
    window.colorize.setColor(obj, fireballColor);
    document.querySelector('input[name=fireball-color]').value = fireballColor;
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
