const express = require('express');
const userController = require('../controller/userController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);
router.get("/allData", userController.getAllData);
router.post("/verifyToken", authenticate, userController.verifyToken);

module.exports = router;