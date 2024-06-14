const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const axios = require('axios');
const communicationServiceBaseUrl = process.env.COMMUNICATION_BASE_URL;


const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            accountActivated: false
        }
    });
    try {
        const response = await axios.post(communicationServiceBaseUrl + "api/v1/send-email", {
            to: user.email,
            subject: "Activate your Account",
            templateName: "accountActivate",
            templateData: {
                "title": "Please Activate Your Account",
                "firstName": user.firstName,
                "token": generateToken({userId: user.id}),
            }
        });
    } catch(error) {
        throw new Error(`Failed to send Email ${error.response ? error.response.data : error.message}`);
    }
    return user;
};

const updateUser = async (id, data) => {
    return await prisma.user.update({
        where: { id },
        data
    });
};

const deleteUser = async (id) => {
    return await prisma.user.delete({where: {id}});
};

const login = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return generateToken({ userId: user.id });
  };

const getAll = async () => {
    return await prisma.user.findMany();
}

const verifyToken = async (req) => {
    const userId = req.user.userId;
    const id = req.body.id;
    if (userId != id) {
        return;
    }
    await prisma.user.update({where: {
        id: userId
    }, data: {
        accountActivated: true
    }});
    return await prisma.user.findFirst({where: {
        id: userId
    }});
}

module.exports = { createUser, updateUser, deleteUser, login, getAll, verifyToken };