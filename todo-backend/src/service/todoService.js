const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTodos = async (user) => {
    const id = user.userId;
    return await prisma.task.findMany({where: {
        userId: id
    }});
};

async function checkIfCorrectUserIsAccessing(id, user) {
    const task = await prisma.task.findFirst({where: {id: id}});
    if (task.userId != user.userId) {
        return false;
    }
    return true;
}

const getTodo = async (id, user) => {
    if (!(await checkIfCorrectUserIsAccessing(id, user))) {
        return;
    }
    return prisma.task.findUnique({
        where: {id},
    });
};

const createTodo = async (data, userId) => {
    const user = await prisma.user.findFirst({where: {
        id: userId
    }})
    return await prisma.task.create({
        data: {
            userId: user.id,
            title: data.title,
            description: data.description
        }
    });
};

const updateTodo = async (id, data, user) => {
    if (!(await checkIfCorrectUserIsAccessing(id, user))) {
        return;
    }
    return await prisma.task.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            status: data.status,
        }
    });
};

const deleteTodo = async (id) => {
    return prisma.task.delete({where: {id}});
};

module.exports = { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };