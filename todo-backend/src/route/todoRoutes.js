const express = require('express');
const todoController = require('../controller/todoController');
const { todoSchema } = require('../schemas/todoSchema')
const validateTodoSchema = require('../middleware/validateTodoSchema')
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/all", authenticate, todoController.getAllTodos);
router.get("/:id", authenticate, todoController.getTodo);
router.post("/", validateTodoSchema(todoSchema), authenticate, todoController.createTodo);
router.patch("/:id", authenticate, todoController.updateTodo);
router.delete("/:id", authenticate, todoController.deleteTodo);

module.exports = router;