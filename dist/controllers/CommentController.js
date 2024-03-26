"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comment = require("../models/CommentModel");
const Blog = require("../models/BlogModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { createCommentValidationSchema, updateCommentValidationSchema } = require('../ValidationSchema/CommentSchema');
class commentController {
    static async createComment(req, res) {
        const formData = req.body;
        const validationResult = createCommentValidationSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const userId = formData.userId;
        const blogId = formData.blogId;
        const comment = formData.comment;
        const newComment = Comment({
            userId,
            blogId,
            comment
        });
        try {
            await newComment.save();
            const newCommentCount = await Comment.countDocuments({ blogId });
            await Blog.findByIdAndUpdate(new ObjectId(blogId), { comments: newCommentCount });
            return res.status(201).json({ msg: "Comment saved successfully" });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async getComments(req, res) {
        try {
            const comments = await Comment.find();
            return res.status(200).json({ commentList: comments });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async deleteComment(req, res) {
        const id = new ObjectId(req.params.id);
        try {
            const comment = await Comment.findOne({ _id: id });
            const deletedComment = await Comment.findByIdAndDelete(id);
            if (!deletedComment) {
                return res.status(404).json({ msg: "Comment not found" });
            }
            const newCommentCount = await Comment.countDocuments({ blogId: comment.blogId });
            await Blog.findByIdAndUpdate(new ObjectId(comment.blogId), { comments: newCommentCount });
            return res.status(204).json({});
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async updateComment(req, res) {
        const formData = req.body;
        const validationResult = updateCommentValidationSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const id = new ObjectId(formData.id);
        const comment = formData.comment;
        try {
            const updatedDoc = await Comment.findByIdAndUpdate(id, { comment: comment }, { new: true });
            if (updatedDoc) {
                return res.status(200).json({ msg: "Comment successfully updated" });
            }
            else {
                return res.status(400).json({ msg: "Update unsuccessful" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = {
    commentController
};
