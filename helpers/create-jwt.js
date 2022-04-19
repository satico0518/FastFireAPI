const jwt = require('jsonwebtoken');

const createJWT = (_id = '') => {
  return new Promise((resolve, reject) => {
    const payload = { _id };
    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '365d'}, (err, token) => {
      if (err) {
        console.error(err);
        reject('No se pudo generar el JWT');
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = createJWT;
