const { response, request } = require('express');

const loginPost = (req = request, res = response) => {
  const { user, password } = req.body;
  res.json({
    msg: 'Login post',
    user,
    password,
  });
};

module.exports = {
  loginPost,
};
