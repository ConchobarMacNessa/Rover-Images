/* eslint-disable */
function updateDOM(dataArr) {
  document.getElementById('app').innerHTML = '';
  var roverImage = createEl('img', 'roverImage', null, dataArr[0].img_src);
  var app = document.getElementById('app');
  app.appendChild(roverImage);
};

function createEl(element, className, text, url) {
  var el = document.createElement(element);
  el.className = className || '';
  el.textContent = text || '';
  if(url) el.src = url;
  return el;
}

function fetch(method, url, cb) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var data = JSON.parse(request.responseText);
            cb(data);
        }
    }
    request.onerror = function() {
        cb('Sorry, connection error');
    }
    request.open(method, url, true);
    request.send();
};

fetch('GET', 'http://localhost:4000/api', updateDOM);
