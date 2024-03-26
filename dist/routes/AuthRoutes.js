"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { authController } = require('../controllers/AuthController');
const router = express.Router();
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: New user created successfully
 *       '400':
 *         description: Failed Validation
 *       '409':
 *         description: Conflict. Bad syntax
 *       '500':
 *         description: Internal Server Error
 */
router.post('/signup', authController.signUp);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *       '400':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
router.post('/login', authController.login);
module.exports = router;
