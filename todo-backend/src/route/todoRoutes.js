const express = require('express');
const todoController = require('../controller/todoController');

const router = express.Router();

router.get("/all", todoController);
router.get("/:id", todoController);
router.post("/", todoController);
router.patch("/:id", todoController);
router.delete("/:id", todoController);

module.exports = router;