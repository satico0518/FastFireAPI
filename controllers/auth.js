const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const createJWT = require('../helpers/create-jwt');

const loginPost = async (req = request, res = response) => {
  const { user, password } = req.body;

  try {
    const userDB = await User.findOne({ identification: user});
    if (!userDB){
      return res.status(400).json({error: 'Usuario o Contrasena incorrecto!'});
    }
    if (!userDB.isActive) {
      return res.status(400).json({error: 'Usuario registrado pero no activo, solicite su activacion!'});
    }
    if(!bcryptjs.compareSync(password, userDB.password)){
      return res.status(400).json({error: 'Usuario o Contrasena incorrecto!'});
    }
    const token = await createJWT(userDB._id);
    res.json({
      msg: 'Login OK',
      token,
    });
  } catch (error) {
    res.status(500).json({error});
  }
};

module.exports = {
  loginPost,
};
