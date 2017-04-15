const getSol = require('../helper_functions/getMaxSol.js');

module.exports = {
  method: 'GET',
  path: '/api',
  handler: (req, reply) => {
    getSol((data) => {
      reply(data);
    });
  },
};
