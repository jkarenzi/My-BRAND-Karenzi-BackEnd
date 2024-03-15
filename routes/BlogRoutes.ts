const express = require("express")
import { Router } from 'express';
const { blogController } = require('../controllers/BlogController')

const router: Router = express.Router()

router.post('/create_blog', blogController.createBlog)

router.get('/get_blogs', blogController.getBlogs)

router.get('/get_blog/:id', blogController.getBlog)

router.post('/update_blog', blogController.updateBlog)

router.delete('/delete_blog/:id', blogController.deleteBlog)

router.post('/like', blogController.like)

router.post('/dislike', blogController.dislike)

module.exports = router