const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;