const { Router } = require('express');
const { check } = require('express-validator');

const {
  userGet,
  userByIdGet,
  userPost,
  updateUserPut,
  updateUserDelete,
  userInactiveGet,
} = require('../controllers/user');
const {
  roleValidation,
  userExists,
  userExistsById,
  deviceIdExists,
} = require('../helpers/db-validators');

const { fieldValidation } = require('../middlewares/field-validations');
const { verifyJWT } = require('../middlewares/verify-jwt');
const { verifyRoles } = require('../middlewares/verify-roles');

const router = Router();

router.get(
  '/',
  [verifyJWT, verifyRoles('ADMIN_ROLE', 'SUPERVISOR_ROLE')],
  userGet
);
router.get(
  '/inactive',
  [verifyJWT, verifyRoles('ADMIN_ROLE', 'SUPERVISOR_ROLE')],
  userInactiveGet
);
router.get(
  '/:id',
  [
    verifyJWT,
    verifyRoles('ADMIN_ROLE', 'SUPERVISOR_ROLE'),
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(userExistsById),
    fieldValidation,
  ],
  userByIdGet
);
router.post(
  '/',
  [
    check('identification').custom(userExists),
    check('identification', 'La identificacion no es correcta').isNumeric(),
    check('deviceId', 'El ID del dispositivo es obligatorio').notEmpty(),
    check('deviceId').custom(deviceIdExists),
    check('password', 'La contrasena debe tener minimo 6 caracteres').isLength({
      min: 6,
    }),
    check('role').custom(roleValidation),
    fieldValidation,
  ],
  userPost
);
router.put(
  '/:id',
  [
    verifyJWT,
    verifyRoles('ADMIN_ROLE', 'SUPERVISOR_ROLE'),
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(roleValidation),
    fieldValidation,
  ],
  updateUserPut
);
router.delete(
  '/:id',
  [
    verifyJWT,
    verifyRoles('ADMIN_ROLE'),
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(userExistsById),
    fieldValidation,
  ],
  updateUserDelete
);

module.exports = router;
