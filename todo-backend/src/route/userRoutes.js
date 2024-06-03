const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get("/all", userController);
router.get("/:id", userController);
router.post("/", userController);
router.patch("/:id", userController);
router.delete("/:id", userController);

module.exports = router;