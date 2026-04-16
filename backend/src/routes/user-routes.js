const express = require('express');
const router = express.Router();
const { createUser, updateUser } = require('../controllers/user-controller');

router.post('/create-users', createUser);
router.patch('/update-users/:id', updateUser);

module.exports = router;