const { response, request } = require('express');

const userGet = (req, res = response) => {
  res.json({ msg: 'Hello World!' });
};

const userByIdGet = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ msg: `usuario con id ${id}` });
};

module.exports = {
  userGet,
  userByIdGet,
};
