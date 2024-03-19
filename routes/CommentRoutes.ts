const express = require("express")
import { Router } from 'express';
const { createComment, getComments, updateComment, deleteComment } = require('../controllers/CommentController')
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization')

const router: Router = express.Router()

router.post('/create_comment', authenticateUser, authorizeAdmin, createComment)

router.get('/get_comments', getComments)

router.post('/update_comment', authenticateUser, updateComment)

router.delete('/delete_comment/:id', authenticateUser, deleteComment)

module.exports = router