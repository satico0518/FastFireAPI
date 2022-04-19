const { Router } = require('express');
const { check } = require('express-validator');
const { turnsByUIDGet, turnsInitPost, turnsFinishPut } = require('../controllers/turn');
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

module.exports = router;
