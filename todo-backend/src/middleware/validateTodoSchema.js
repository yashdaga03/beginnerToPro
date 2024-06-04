const validateTodoSchema = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(result.error.format());
    }
    req.body = result.data;
    next();
};

module.exports = validateTodoSchema;
