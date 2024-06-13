const todoService = require('../service/todoService');

const getAllTodos = async (req, res) => {
    try {
        const user = req.user;
        const todos = await todoService.getAllTodos(user);
        return res.status(200).json({"success": true, "todos": todos});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

const getTodo = async (req, res) => {
    try {
        const todo = await todoService.getTodo(parseInt(req.params.id), req.user);
        if (!todo) {
            return res.status(404).json({"success": false, "message":"Todo with id " + req.params.id + " does not exist for logged in User"});
        } 
        return res.status(200).json({"success": true, "todo": todo});
    } catch (err) {
        return res.status(500).json({"success": false, "message":"Internal Server Error"});
    }
};

const createTodo = async (req, res) => {
    try {
        const user = req.user;
        const todo = await todoService.createTodo(req.body, user.userId);
        return res.status(200).json({"success": true, "message": "Todo created with ID: " + todo.id});
    } catch(err) {
        return res.status(500).json({"status": false, "message": "Todo creation failed!"})
    }
};

const deleteTodo = async (req, res) => {
    try {
        const exceptedTodo = await todoService.getTodo(parseInt(req.params.id), req.user);
        if (!exceptedTodo) {
            if (!exceptedTodo) {
                return res.status(403).json({"success": false, "message":"You do not have access for this todo Id: " + req.params.id});
            } 
        }
        await todoService.deleteTodo(parseInt(req.params.id));
        return res.status(200).json({"success": true, "message": "Todo Deleted Successfully"});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await todoService.updateTodo(parseInt(req.params.id), req.body, req.user);
        if (!todo) {
            return res.status(404).json({"success": false, "message":"Todo with id " + req.params.id + " does not exist for logged in User"});
        }
        return res.status(200).json({"success": true, "message": "Todo Updated Successfully", "data": todo});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

module.exports = { getAllTodos, getTodo, createTodo, deleteTodo, updateTodo };