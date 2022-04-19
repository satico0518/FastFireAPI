const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/field-validations');

const router = Router();

router.post('/login', [
    check('user', 'Usuario es obligatorio!').notEmpty(),
    check('password', 'Contrasena es obligatoria!').notEmpty(),
    fieldValidation
], loginPost);


module.exports = router;
