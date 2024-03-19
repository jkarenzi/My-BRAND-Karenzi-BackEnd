"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog, like, dislike } = require('../controllers/BlogController');
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization');
const router = express.Router();
router.post('/create_blog', authenticateUser, authorizeAdmin, createBlog);
router.get('/get_blogs', getBlogs);
router.get('/get_blog/:id', getBlog);
router.post('/update_blog', authenticateUser, authorizeAdmin, updateBlog);
router.delete('/delete_blog/:id', authenticateUser, authorizeAdmin, deleteBlog);
router.post('/like', authenticateUser, like);
router.post('/dislike', authenticateUser, dislike);
module.exports = router;
