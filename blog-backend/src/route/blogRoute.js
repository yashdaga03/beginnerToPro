const express = require('express');
const blogController = require('../controller/blogController');

const router = express.Router();

router.get("/all", blogController.getAllBlogs);
router.get("/:id", blogController.getBlog);
router.post("/", blogController.createBlog);
router.patch("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;