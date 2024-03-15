"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { queryController } = require('../controllers/QueryController');
const router = express.Router();
router.post('/create_query', queryController.createQuery);
router.get('/get_queries', queryController.getQueries);
router.get('/get_query/:id', queryController.getQuery);
module.exports = router;
