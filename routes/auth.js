const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost, tokenCheck } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/field-validations');
const { verifyJWT } = require('../middlewares/verify-jwt');

const router = Router();

router.post('/login', [
    check('deviceId', 'El Id del dispositivo es obligatorio!').notEmpty(),
    check('user', 'Usuario es obligatorio!').notEmpty(),
    check('password', 'Contrasena es obligatoria!').notEmpty(),
    fieldValidation
], loginPost);

router.get('/check', [ verifyJWT ], tokenCheck);


module.exports = router;
