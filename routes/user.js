const { Router } = require('express');
const { userGet, userByIdGet } = require('../controllers/user');

const router = Router();

router.get('/', userGet);
router.get('/:id', userByIdGet);


module.exports = router;
