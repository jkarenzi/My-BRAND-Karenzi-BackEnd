"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blog = require("../models/BlogModel");
const Like = require('../models/LikeModel');
const Dislike = require('../models/DislikeModel');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cloudinary_1 = require("cloudinary");
const { createBlogValidationSchema, updateBlogValidationSchema, blogActionValidationSchema } = require('../ValidationSchema/BlogSchema');
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
class blogController {
    static async createBlog(req, res) {
        const formData = req.body;
        const validationResult = createBlogValidationSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const title = formData.title;
        const content = formData.content;
        const files = req.files;
        const file = files.image[0];
        try {
            const uploadResult = await new Promise((resolve) => {
                cloudinary_1.v2.uploader.upload_stream((error, uploadResult) => {
                    return resolve(uploadResult);
                }).end(file.buffer);
            });
            const newBlog = Blog({
                title,
                content,
                imageUrl: uploadResult.url
            });
            await newBlog.save();
            return res.status(201).json({ msg: "Blog saved successfully" });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async getBlogs(req, res) {
        try {
            const blogs = await Blog.find();
            return res.status(200).json({ blogList: blogs });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async getBlog(req, res) {
        const id = new ObjectId(req.params.id);
        try {
            const blog = await Blog.findOne({ _id: id });
            if (blog) {
                return res.status(200).json({ blog: blog });
            }
            else {
                return res.status(404).json({ msg: "Blog not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async updateBlog(req, res) {
        const formData = req.body;
        const validationResult = updateBlogValidationSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const id = new ObjectId(formData.id);
        const title = formData.title;
        const content = formData.content;
        const files = req.files;
        const file = files.image[0];
        try {
            const uploadResult = await new Promise((resolve) => {
                cloudinary_1.v2.uploader.upload_stream((error, uploadResult) => {
                    return resolve(uploadResult);
                }).end(file.buffer);
            });
            const updatedDoc = await Blog.findByIdAndUpdate(id, { title, content, imageUrl: uploadResult.url }, { new: true });
            if (updatedDoc) {
                return res.json({ msg: "Blog updated successfully" });
            }
            else {
                return res.status(404).json({ msg: "Blog not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async deleteBlog(req, res) {
        const id = new ObjectId(req.params.id);
        try {
            const deletedDoc = await Blog.findByIdAndDelete(id);
            if (deletedDoc) {
                return res.status(204).json({});
            }
            else {
                return res.status(404).json({ msg: "Blog not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async like(req, res) {
        const formData = req.body;
        const validationResult = blogActionValidationSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const userId = formData.userId;
        const blogId = formData.blogId;
        try {
            const like = await Like.findOne({ blogId, userId });
            if (like) {
                const deleted = await Like.findByIdAndDelete(like._id);
                const newLikeCount = await Like.countDocuments({ blogId });
                await Blog.findByIdAndUpdate(new ObjectId(blogId), { likes: newLikeCount });
                return res.status(204).json({});
            }
            else {
                const newLike = Like({
                    userId,
                    blogId
                });
                await newLike.save();
                const newLikeCount = await Like.countDocuments({ blogId });
                await Blog.findByIdAndUpdate(new ObjectId(blogId), { likes: newLikeCount });
                return res.status(201).json({ msg: "Like saved successfully" });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async dislike(req, res) {
        const formData = req.body;
        const validationResult = blogActionValidationSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const userId = formData.userId;
        const blogId = formData.blogId;
        try {
            const dislike = await Dislike.findOne({ blogId, userId });
            if (dislike) {
                const deleted = await Dislike.findByIdAndDelete(dislike._id);
                const newDislikeCount = await Dislike.countDocuments({ blogId });
                await Blog.findByIdAndUpdate(new ObjectId(blogId), { dislikes: newDislikeCount });
                return res.status(204).json({});
            }
            else {
                const newDislike = Dislike({
                    userId,
                    blogId
                });
                await newDislike.save();
                const newDislikeCount = await Dislike.countDocuments({ blogId });
                await Blog.findByIdAndUpdate(new ObjectId(blogId), { dislikes: newDislikeCount });
                return res.status(201).json({ msg: "Dislike saved successfully" });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
}
module.exports = {
    blogController
};
