const { z } = require('zod');

const todoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required")
});

module.exports = {
    todoSchema
}