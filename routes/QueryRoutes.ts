const express = require("express")
import { Router } from 'express';
const { createQuery, getQueries, getQuery } = require('../controllers/QueryController')
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization')

const router: Router = express.Router()

router.post('/create_query', authenticateUser, authorizeAdmin, createQuery)

router.get('/get_queries', authenticateUser, authorizeAdmin, getQueries)

router.get('/get_query/:id', authenticateUser, authorizeAdmin, getQuery)

module.exports = router