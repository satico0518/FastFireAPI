const { Router } = require('express');
const { check } = require('express-validator');
const { fileUploads } = require('../controllers/uploads');
const { fieldValidation } = require('../middlewares/field-validations');
const { verifyJWT } = require('../middlewares/verify-jwt');

const router = Router();

router.put('/:to/:uid', [
    // verifyJWT,
    // check('to').isIn(['avatar']),
    // check('uid').isMongoId(),
    // fieldValidation,
], fileUploads);

module.exports = router;
