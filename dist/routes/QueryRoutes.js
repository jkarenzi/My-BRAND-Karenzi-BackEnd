"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { createQuery, getQueries, getQuery } = require('../controllers/QueryController');
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization');
const router = express.Router();
router.post('/create_query', authenticateUser, authorizeAdmin, createQuery);
router.get('/get_queries', authenticateUser, authorizeAdmin, getQueries);
router.get('/get_query/:id', authenticateUser, authorizeAdmin, getQuery);
module.exports = router;
