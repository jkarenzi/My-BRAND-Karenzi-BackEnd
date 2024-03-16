const Comment = require("../models/CommentModel")
import { Request, Response } from 'express';
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
const { createCommentValidationSchema, updateCommentValidationSchema } = require('../ValidationSchema/CommentSchema')

class commentController {
    static async createComment(req:Request, res:Response){
        const formData = req.body

        const validationResult = createCommentValidationSchema.validate(formData)
        if(validationResult.error){
            return res.status(400).json({msg:validationResult.error.details[0].message})
        }

        const userId:string = formData.userId
        const blogId:string = formData.blogId
        const comment:string = formData.comment
    
        const newComment = Comment({
            userId,
            blogId,
            comment
        })
    
        try{
            await newComment.save()
            return res.status(201).json({msg:"Comment saved successfully"})
        }catch(err:any){
            return res.status(500).json({ msg: 'Internal server error' });
        }    
    }
    
    static async getComments(req:Request, res:Response){
        try{
            const comments: Object[] = await Comment.find()
            return res.status(200).json({commentList: comments})
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async deleteComment(req:Request, res:Response){
        const id = new ObjectId(req.params.id)
        try{
            const deletedComment = await Comment.findByIdAndDelete(id)
            if(!deletedComment){
                return res.status(404).json({msg: "Comment not found"})
            }
    
            return res.status(204)
        }catch(err:any){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async updateComment(req:Request, res:Response){
        const formData = req.body

        const validationResult = updateCommentValidationSchema.validate(formData)
        if(validationResult.error){
            return res.status(400).json({msg:validationResult.error.details[0].message})
        }

        const id = new ObjectId(formData.id)
        const comment:string = formData.comment
        try{
            const updatedDoc = await Comment.findByIdAndUpdate(id,{comment: comment},{new:true})
            if(updatedDoc){
                return res.status(200).json({msg: "Comment successfully updated"})
            }else{
                return res.status(400).json({msg: "Update unsuccessful"})
            }
        }catch(err:any){
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = {
    commentController
}