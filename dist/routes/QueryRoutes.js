"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { queryController } = require('../controllers/QueryController');
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization');
const router = express.Router();
/**
 * @swagger
 * /queries/create_query:
 *   post:
 *     summary: Create new query
 *     tags: [Query]
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
 *               query:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created new query successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.post('/create_query', authenticateUser, authorizeAdmin, queryController.createQuery);
/**
 * @swagger
 * /queries/get_queries:
 *   get:
 *     summary: Get all queries
 *     tags: [Query]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retrieved all queries successfully
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.get('/get_queries', authenticateUser, authorizeAdmin, queryController.getQueries);
/**
 * @swagger
 * /queries/get_query/{id}:
 *   get:
 *     summary: Get a single query
 *     tags: [Query]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the user to operate on
 *     responses:
 *       '200':
 *         description: Retrieved all queries successfully
 *       '404':
 *         description: Query not found
 *       '401':
 *         description: No token provided
 *       '403':
 *         description: Invalid token
 *       '500':
 *         description: Internal Server Error
 */
router.get('/get_query/:id', authenticateUser, authorizeAdmin, queryController.getQuery);
module.exports = router;
