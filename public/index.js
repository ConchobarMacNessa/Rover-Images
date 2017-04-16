/* eslint-disable */
function updateDOM(dataArr) {
  document.getElementById('app').innerHTML = '';
  dataArr.forEach(function(obj){
    var id = obj.id + '';
    var roverImage = createEl('img', 'roverImage', 'image'+ id, null, obj.img_src, openModal);
    var app = document.getElementById('app');
    app.appendChild(roverImage);

    var modal = createEl('div', 'modal', 'modal' + id);
    var modalContent = createEl('div', 'modal__content', id, 'hello');
    var close = createEl('span', 'modal__close', 'X');
    app.appendChild(modal);
    modal.appendChild(modalContent);
    modal.appendChild(close);
  })
};



// var close = document.getElementsByClassName('modal__close')[0];
//
// close.onclick = function() {
//   modal.style.display = 'none';
// }

function openModal(e){
  var targetClass = e.target.id;
  var modalId = 'modal' + targetClass.slice(5);
  var modal = document.getElementById(modalId);
  modal.style.display = 'block';
};

function createEl(element, className, id, text, url, func) {
  var el = document.createElement(element);
  el.className = className || '';
  el.id = id || '';
  el.textContent = text || '';
  if(url) el.src = url;
  if (func) el.onclick = func;
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
