const express = require("express")
import { Router } from 'express';
const { queryController } = require('../controllers/QueryController')
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization')

const router: Router = express.Router()

router.post('/create_query', authenticateUser, authorizeAdmin, queryController.createQuery)

router.get('/get_queries', authenticateUser, authorizeAdmin, queryController.getQueries)

router.get('/get_query/:id', authenticateUser, authorizeAdmin, queryController.getQuery)

module.exports = router