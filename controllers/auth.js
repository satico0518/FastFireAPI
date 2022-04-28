const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const createJWT = require('../helpers/create-jwt');

const loginPost = async (req = request, res = response) => {
  const { user, password, deviceId } = req.body;

  try {
    const userDB = await User.findOne({ identification: user });
    if (!userDB) {
      return res
        .status(400)
        .json({ error: 'Usuario o Contrasena incorrecto!' });
    }
    if (!bcryptjs.compareSync(password, userDB.password)) {
      return res
        .status(400)
        .json({ error: 'Usuario o Contrasena incorrecto!' });
    }
    if (!userDB.isActive) {
      return res.status(400).json({
        error: 'Usuario registrado pero no activo, solicite su activacion!',
      });
    }
    if (userDB.deviceId !== deviceId) {
      userDB.deviceIdFailed = deviceId;
      userDB.save();
      return res
        .status(400)
        .json({
          error:
            'Dispositivo no coincide, ingrese desde su teléfono!. Si perdió su teléfono, avísele a su supervisor!',
        });
    }
    const token = await createJWT(userDB._id);
    res.json({
      user: userDB,
      token,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const changeDeviceID = async (req = request, res = response) => {
  try {
    const { uid, deviceId } = req.body;
    User.findById(uid, (err, user) => {
      if (err) {
        throw new Error('Error buscando usuario');
      }

      user.deviceId = deviceId;
      user.deviceIdFailed = undefined;
      user.save();
    });
    return res.json({ msg: 'ID de dispositivo actualizado exitosamente!' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Error cambiando id del dispositivo' });
  }
};

const changePass = async (req = request, res = response) => {
  try {
    const { uid, password } = req.body;
    User.findById(uid, (err, user) => {
      if (err) {
        throw new Error('Error buscando usuario');
      }
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    user.save();
    });
    return res.json({ msg: 'Contraseña actualizada exitosamente!' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Error cambiando Contraseña' });
  }
};

const tokenCheck = async (req = request, res = response) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'Usuario no autenticado!' });
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: 'Error validando el token' });
  }
};

module.exports = {
  loginPost,
  changeDeviceID,
  tokenCheck,
  changePass
};
