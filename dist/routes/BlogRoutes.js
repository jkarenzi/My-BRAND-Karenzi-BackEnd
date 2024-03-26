"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { blogController } = require('../controllers/BlogController');
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization');
const upload = require("../middleware/multer");
const router = express.Router();
/**
 * @swagger
 * /blogs/create_blog:
 *   post:
 *     summary: Create new blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Created new blog successfully
 *       '400':
 *         description: Failed validation
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/create_blog', authenticateUser, authorizeAdmin, upload.fields([{ name: 'title' }, { name: 'content' }, { name: 'image' }]), blogController.createBlog);
/**
 * @swagger
 * /blogs/get_blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       '200':
 *         description: Retrieved all blogs successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.get('/get_blogs', blogController.getBlogs);
/**
 * @swagger
 * /blogs/get_blog/{id}:
 *   get:
 *     summary: Get a single blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the user to operate on
 *     responses:
 *       '200':
 *         description: Retrieved single blog successfully
 *       '404':
 *         description: Blog not found
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.get('/get_blog/:id', blogController.getBlog);
/**
 * @swagger
 * /blogs/update_blog:
 *   post:
 *     summary: Update blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '400':
 *         description: Failed Validation
 *       '200':
 *         description: Update successful
 *       '404':
 *         description: Blog not found
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/update_blog', authenticateUser, authorizeAdmin, upload.fields([{ name: 'title' }, { name: 'content' }, { name: 'image' }]), blogController.updateBlog);
/**
 * @swagger
 * /blogs/delete_blog/{id}:
 *   delete:
 *     summary: Delete blog by id
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the user to operate on
 *     responses:
 *       '204':
 *         description: Blog deleted successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/delete_blog/:id', authenticateUser, authorizeAdmin, blogController.deleteBlog);
/**
 * @swagger
 * /blogs/like:
 *   post:
 *     summary: Like
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               blogId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: like saved successfully
 *       '204':
 *         description: Like deleted successfully
 *       '400':
 *         description: Failed validation
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/like', authenticateUser, blogController.like);
/**
 * @swagger
 * /blogs/dislike:
 *   post:
 *     summary: Dislike
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               blogId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Dislike saved successfully
 *       '204':
 *         description: Dislike deleted successfully
 *       '400':
 *         description: Failed validation
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/dislike', authenticateUser, blogController.dislike);
module.exports = router;
