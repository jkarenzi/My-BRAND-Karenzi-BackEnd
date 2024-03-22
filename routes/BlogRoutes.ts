const express = require("express")
import { Router } from 'express';
const { blogController } = require('../controllers/BlogController')
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization')

const router: Router = express.Router()

router.post('/create_blog', authenticateUser, authorizeAdmin, blogController.createBlog)

router.get('/get_blogs', blogController.getBlogs)

router.get('/get_blog/:id', blogController.getBlog)

router.post('/update_blog', authenticateUser, authorizeAdmin, blogController.updateBlog)

router.delete('/delete_blog/:id', authenticateUser, authorizeAdmin, blogController.deleteBlog)

router.post('/like', authenticateUser, blogController.like)

router.post('/dislike', authenticateUser, blogController.dislike)

module.exports = router