"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comment = require("../models/CommentModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
class commentController {
    static async createComment(req, res) {
        const formData = req.body;
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
            return res.json({ msg: "Comment saved successfully" });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async getComments(req, res) {
        try {
            const comments = await Comment.find();
            return res.json({ commentList: comments });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async deleteComment(req, res) {
        const id = new ObjectId(req.params.id);
        try {
            const deletedComment = await Comment.findByIdAndDelete(id);
            if (!deletedComment) {
                return res.status(404).json({ msg: "Comment not found" });
            }
            return res.json({ msg: "Comment successfully deleted" });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async updateComment(req, res) {
        const formData = req.body;
        const id = new ObjectId(formData.id);
        const comment = formData.comment;
        try {
            const updatedDoc = await Comment.findByIdAndUpdate(id, { comment: comment }, { new: true });
            if (updatedDoc) {
                return res.json({ msg: "Comment successfully updated" });
            }
            else {
                return res.json({ msg: "Update unsuccessful" });
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
