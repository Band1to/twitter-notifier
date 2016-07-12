/* globals self */
'use strict';

var observer;

window.addEventListener('load', function () {
  let header = document.querySelector('header');
  function count () {
    let num = Array.from(header.querySelectorAll('svg+span')).map(function (e) {
      let num = e.textContent;
      return isNaN(num) ? 0 : +num
    }).reduce((p, c) => p + c, 0);
    self.port.emit('count', num);
  }
  if (header && !observer) {
    observer = new window.MutationObserver(count);
    observer.observe(header,  {
      attributes: true,
      childList: true,
      characterData: false,
      subtree: true
    });
    count();
    self.port.on('detach', () => {
      observer.disconnect();
    });
  }
});
