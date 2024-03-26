"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { userMgtController } = require('../controllers/UserMgtController');
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization');
const upload = require("../middleware/multer");
const router = express.Router();
/**
 * @swagger
 * /usermgt/get_users:
 *   get:
 *     summary: Get all users
 *     tags: [User management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retrieved all users successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.get('/get_users', authenticateUser, authorizeAdmin, userMgtController.getUsers);
/**
 * @swagger
 * /usermgt/delete_user/{id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags: [User management]
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
 *         description: User deleted successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/delete_user/:id', authenticateUser, authorizeAdmin, userMgtController.deleteUser);
/**
 * @swagger
 * /usermgt/update_username:
 *   post:
 *     summary: Update the username
 *     tags: [User management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               newUsername:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '400':
 *         description: Failed Validation
 *       '200':
 *         description: Update successful
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/update_username', authenticateUser, userMgtController.updateUsername);
/**
 * @swagger
 * /usermgt/update_password:
 *   post:
 *     summary: Update the password
 *     tags: [User management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '400':
 *         description: Failed Validation
 *       '200':
 *         description: Update successful
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/update_password', authenticateUser, userMgtController.updatePassword);
/**
 * @swagger
 * /usermgt/update_email:
 *   post:
 *     summary: Update the email
 *     tags: [User management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                 type: string
 *               newEmail:
 *                 type: string
 *     responses:
 *       '400':
 *         description: Failed Validation
 *       '200':
 *         description: Update successful
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/update_email', authenticateUser, userMgtController.updateEmail);
/**
 * @swagger
 * /usermgt/update_profile_img:
 *   post:
 *     summary: Update the profile img
 *     tags: [User management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '400':
 *         description: Failed Validation
 *       '200':
 *         description: Update successful
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/update_profile_img', authenticateUser, upload.fields([{ name: 'id' }, { name: 'password' }, { name: 'image' }]), userMgtController.updateProfile);
module.exports = router;
