"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { commentController } = require('../controllers/CommentController');
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization');
const router = express.Router();
router.post('/create_comment', authenticateUser, authorizeAdmin, commentController.createComment);
router.get('/get_comments', commentController.getComments);
router.post('/update_comment', authenticateUser, commentController.updateComment);
router.delete('/delete_comment/:id', authenticateUser, commentController.deleteComment);
module.exports = router;
