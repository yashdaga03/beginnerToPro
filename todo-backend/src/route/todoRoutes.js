const express = require('express');
const todoController = require('../controller/todoController');
const { todoSchema } = require('../schemas/todoSchema')
const validateTodoSchema = require('../middleware/validateTodoSchema')

const router = express.Router();

router.get("/all", todoController.getAllTodos);
router.get("/:id", todoController.getTodo);
router.post("/", validateTodoSchema(todoSchema), todoController.createTodo);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;