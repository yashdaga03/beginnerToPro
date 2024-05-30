const blogService = require('../service/blogService');

const getAllBlogs = async (req, res) => {
    try {
        const { tag } = req.query;
        const blogs = await blogService.getAllBlogs(tag);
        return res.status(200).json({"success": true, "blogs": blogs});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

const getBlog = async (req, res) => {
    try {
        const blog = await blogService.getBlog(parseInt(req.params.id));
        if (!blog) {
            return res.status(404).json({"success": false, "message":"Blog with id " + req.params.id + " does not exist"});
        } 
        return res.status(200).json({"success": true, "blog": blog});
    } catch (err) {
        return res.status(500).json({"success": false, "message":"Internal Server Error"});
    }
};

const createBlog = async (req, res) => {
    try {
        const blog = await blogService.createBlog(req.body);
        return res.status(200).json({"success": true, "message": "Blog created with ID: " + blog.id});
    } catch(err) {
        return res.status(500).json({"status": false, "message": "Blog creation failed!"})
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await blogService.deleteBlog(parseInt(req.params.id));
        if (!blog) {
            return res.status(404).json({"success": false, "message":"Blog with id " + req.params.id + " does not exist"});
        } 
        return res.status(200).json({"success": true, "message": "Blog Deleted Successfully"});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await blogService.updateBlog(parseInt(req.params.id), req.body);
        if (!blog) {
            return res.status(404).json({"success": false, "message":"Blog with id " + req.params.id + " does not exist"});
        }
        return res.status(200).json({"success": true, "message": "Blog Updated Successfully", "data": blog});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

module.exports = { getAllBlogs, getBlog, createBlog, deleteBlog, updateBlog };