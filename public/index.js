/* eslint-disable */
function updateDOM(dataArr) {
  document.getElementById('app').innerHTML = '';
  dataArr.forEach(function(obj){
    var id = obj.id + '';
    var roverImage = createEl('img', 'roverImage', 'image'+ id, null, obj.img_src, openModal);
    var app = document.getElementById('app');
    app.appendChild(roverImage);

    var modalText = createModalText(obj);

    var modal = createEl('div', 'modal', 'modal' + id);
    var modalContent = createEl('div', 'modal__content', id);
    var modalContainer = createEl('div', 'modal__container');
    var modalTextContainer = createEl('div', 'modal__container', null, modalText);
    var close = createEl('span', 'modal__close', 'close' + id, 'Close tab', null, closeModal);
    var enlargedImage = createEl('img', 'modal__image', 'enlargedImage' + id, null, obj.img_src);
    app.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalContainer);
    modalContainer.appendChild(enlargedImage);
    modalContent.appendChild(modalTextContainer);
    modalContent.appendChild(close);
  })
};

function createModalText(obj) {
  var text = 'This image was taken on ' + obj.earth_date + ', by ' + obj.rover_name + '\'s ' + obj.camera_name + '.\n' + obj.rover_name + ' landed on Mars on ' + obj.landing_date + ', and has spent ' + obj.max_sol + ' sols on the planet, taking ' + obj.total_photos + ' photos to date.';
  return text;
}

function closeModal(e){
  var targetClass = e.target.id;
  var modalId = 'modal' + targetClass.slice(5);
  var modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

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

// fetch('GET', 'http://localhost:4000/api', updateDOM);
fetch('GET', 'https://rover-vision.herokuapp.com/api', updateDOM);
