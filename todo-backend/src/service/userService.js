const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (data) => {
    return prisma.user.create({data});
};

const updateUser = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data
    });
};

const deleteUser = async (id) => {
    return prisma.user.delete({where: {id}});
};

module.exports = { createUser, updateUser, deleteUser };