'use strict';

window.backend = (function () {
  var LOAD_URL = 'https://javascript.pages.academy/code-and-magick/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/code-and-magick';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var toServerRequest = function (address, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, address);

    // if (data !== null) {
    xhr.send(data);
    // } else {
    //   xhr.send();
    // }

  };

  var load = function (onLoad, onError) {
    toServerRequest(LOAD_URL, 'GET', null, onLoad, onError);
    // var xhr = new XMLHttpRequest();

    // xhr.responseType = 'json';
    // xhr.addEventListener('load', function () {
    //   if (xhr.status === StatusCode.OK) {
    //     onLoad(xhr.response);
    //   } else {
    //     onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    //   }
    // });
    // xhr.addEventListener('error', function () {
    //   onError('Произошла ошибка соединения');
    // });
    // xhr.addEventListener('timeout', function () {
    //   onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    // });
    // xhr.timeout = TIMEOUT_IN_MS;
    // xhr.open('GET', LOAD_URL);
    // xhr.send();
  };

  var save = function (data, onLoad, onError) {
    toServerRequest(UPLOAD_URL, 'POST', data, onLoad, onError);

  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     onLoad(xhr.response);
  //   });
  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });
  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });
  //   xhr.timeout = TIMEOUT_IN_MS;
  //   xhr.open('POST', UPLOAD_URL);
  //   xhr.send(data);
  };

  return {
    load: load,
    save: save
  };
})();
