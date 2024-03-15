const express = require("express")
import { Router } from 'express';
const { commentController } = require('../controllers/CommentController')

const router: Router = express.Router()

router.post('/create_comment', commentController.createComment)

router.get('/get_comments', commentController.getComments)

router.post('/update_comment', commentController.updateComment)

router.delete('/delete_comment/:id', commentController.deleteComment)

module.exports = router