const request = require('request');
const getRoverData = require('./getRoverData.js');

function getSol(cb) {
  const url = 'https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=1666';
  request(url, (err, res, body) => {
    if (err) {
      return err;
    }
    const parsedBody = JSON.parse(body);
    const maxSol = parsedBody.photos[0].rover.max_sol;
    getRoverData(maxSol, cb);
  });
}

module.exports = getSol;
