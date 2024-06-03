const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTodos = async () => {
    return prisma.todo.findMany();
};

const getTodo = async (id) => {
    return prisma.todo.findUnique({
        where: {id},
    });
};

const createTodo = async (data) => {
    return prisma.todo.create({data});
};

const updateTodo = async (id, data) => {
    return prisma.todo.update({
        where: { id },
        data
    });
};

const deleteTodo = async (id) => {
    return prisma.todo.delete({where: {id}});
};

module.exports = { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };