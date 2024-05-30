const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllBlogs = async (tag) => {
    const whereClause = tag ? tag : "";
    return prisma.blog.findMany({
        where: {
            tag: whereClause
        }
    });
};

const getBlog = async (id) => {
    return prisma.blog.findUnique({
        where: {id},
    });
};

const createBlog = async (data) => {
    return prisma.blog.create({data});
};

const updateBlog = async (id, data) => {
    return prisma.blog.update({
        where: { id },
        data
    });
};

const deleteBlog = async (id) => {
    return prisma.blog.delete({where: {id}});
};

module.exports = { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog };