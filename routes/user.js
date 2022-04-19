const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userByIdGet, userPost, updateUserPut, updateUserDelete } = require('../controllers/user');
const { roleValidation, userExists, userExistsById } = require('../helpers/db-validators');
const { fieldValidation } = require('../middlewares/fieldValidations');

const router = Router();

router.get('/', userGet);
router.get('/:id', userByIdGet);
router.post('/', [
    check('identification').custom(userExists),
    check('identification', 'La identificacion no es correcta').isNumeric(),
    check('password', 'La contrasena debe tener minimo 6 caracteres').isLength({min: 6}),
    check('role').custom(roleValidation),
    fieldValidation
], userPost);
router.put('/:id', [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(roleValidation),
    fieldValidation
], updateUserPut);
router.delete('/:id', [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(userExistsById),
    fieldValidation
], updateUserDelete);


module.exports = router;
