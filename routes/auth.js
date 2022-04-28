const { Router } = require('express');
const { check } = require('express-validator');
const {
  loginPost,
  tokenCheck,
  changeDeviceID,
  changePass,
} = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/field-validations');
const { verifyJWT } = require('../middlewares/verify-jwt');

const router = Router();

router.post(
  '/login',
  [
    check('deviceId', 'El Id del dispositivo es obligatorio!').notEmpty(),
    check('user', 'Usuario es obligatorio!').notEmpty(),
    check('password', 'Contraseña es obligatoria!').notEmpty(),
    fieldValidation,
  ],
  loginPost
);

router.put(
  '/device',
  [
    verifyJWT,
    check('uid', 'El Id del usuario a modificar es obligatorio!').isMongoId(),
    check('deviceId', 'El nuevo Id del dispositivo es obligatorio!').notEmpty(),
    fieldValidation,
  ],
  changeDeviceID,
);

router.put(
  '/password',
  [
    check('deviceId', 'El Id del dispositivo es obligatorio!').notEmpty(),
    check('identification', 'Identificación del usuario es obligatorio!').notEmpty(),
    check('password', 'La contraseña es obligatoria!').notEmpty(),
    fieldValidation,
  ],
  changePass,
);

router.get('/check', [verifyJWT], tokenCheck);

module.exports = router;
