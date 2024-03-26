const express = require("express")
import { Router } from 'express';
const { commentController } = require('../controllers/CommentController')
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization')

const router: Router = express.Router()

/**
 * @swagger
 * /comments/create_comment:
 *   post:
 *     summary: Create new comment
 *     tags: [Comment]
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
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created new comment successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */


router.post('/create_comment', authenticateUser, authorizeAdmin, commentController.createComment)

/**
 * @swagger
 * /comments/get_comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
 *     responses:
 *       '200':
 *         description: Retrieved all comments successfully
 *       '500':
 *         description: Internal Server Error
 */

router.get('/get_comments', commentController.getComments)

/**
 * @swagger
 * /comments/update_comment:
 *   post:
 *     summary: Update comment
 *     tags: [Comment]
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
 *               comment:
 *                 type: string
 *     responses:
 *       '400':
 *         description: Failed Validation
 *       '200':
 *         description: Update successful
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: Comment not found
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */


router.post('/update_comment', authenticateUser, commentController.updateComment)

/**
 * @swagger
 * /comments/delete_comment/{id}:
 *   delete:
 *     summary: Delete the comment by id
 *     tags: [Comment] 
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
 *         description: Comment deleted successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */

router.delete('/delete_comment/:id', authenticateUser, commentController.deleteComment)

module.exports = router