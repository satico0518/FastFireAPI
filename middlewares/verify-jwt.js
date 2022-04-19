const { response } = require('express');
const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyJWT = async (req = request, res = response, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'Usuario no autenticado!' });
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(400)
        .json({ error: { msg: 'Usuario no existe en DB!' } });
    }
    if (!user.isActive) {
      return res
        .status(400)
        .json({
          error: { msg: 'Usuario inactivo, no puede realizar operaciones!' },
        });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = { verifyJWT };
