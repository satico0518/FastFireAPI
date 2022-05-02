const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { turnsByUIDGet, turnsInitPost, turnsFinishPut, turnsExtraHourReasonPut } = require('../controllers/turn');
const { fieldValidation } = require('../middlewares/field-validations');
const { verifyJWT } = require('../middlewares/verify-jwt');

const router = Router();

router.get('/:uid', [
    verifyJWT,
], turnsByUIDGet);

router.post('/', [
    verifyJWT,
], turnsInitPost);

router.put('/:id', [
    verifyJWT,
], turnsFinishPut);

router.put('/:id/reason', [
    verifyJWT,
    check('reason', 'La razon de la hora extra es obligatoria').notEmpty(),
    fieldValidation
], turnsExtraHourReasonPut);

module.exports = router;
