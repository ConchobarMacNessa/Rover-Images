const request = require('request');

function getRoverData(maxSol, cb) {
  const url = `https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=${maxSol}`;

  request(url, (err, res, body) => {
    if (err) {
      return err;
    }
    const data = [];
    const parsedBody = JSON.parse(body);
    for (let i = 0; i < 9; i++) {
      const obj = {};
      obj.id = i;
      obj.img_src = parsedBody.photos[i].img_src;
      obj.earth_date = parsedBody.photos[i].earth_date;
      obj.rover_name = parsedBody.photos[i].rover.name;
      obj.landing_date = parsedBody.photos[i].rover.landing_date;
      obj.total_photos = parsedBody.photos[i].rover.total_photos;
      obj.camera_name = parsedBody.photos[i].camera.full_name;
      data.push(obj);
    }
    cb(data);
  });
}

module.exports = getRoverData;
