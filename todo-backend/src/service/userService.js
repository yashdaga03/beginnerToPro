const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            accountActivated: true
        }
    });
    return generateToken({userId: user.id});
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

const login = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return generateToken({ userId: user.id });
  };

const getAll = async => {
    return prisma.user.findMany();
}

module.exports = { createUser, updateUser, deleteUser, login, getAll };