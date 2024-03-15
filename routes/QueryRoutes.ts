const express = require("express")
import { Router } from 'express';
const { queryController } = require('../controllers/QueryController')

const router: Router = express.Router()

router.post('/create_query', queryController.createQuery)

router.get('/get_queries', queryController.getQueries)

router.get('/get_query/:id', queryController.getQuery)

module.exports = router