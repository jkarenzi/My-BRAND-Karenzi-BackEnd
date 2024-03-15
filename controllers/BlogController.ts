const Blog = require("../models/BlogModel")
const Like = require('../models/LikeModel')
const Dislike = require('../models/DislikeModel')
import { Request, Response } from 'express';
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

class blogController {
    static async createBlog(req:Request, res:Response){
        const formData = req.body
        const title:string = formData.title
        const content:string = formData.content
    
        const newBlog = Blog({
            title,
            content,
        })
    
        try{
            await newBlog.save()
            return res.json({msg:"Blog saved successfully"})
        }catch(err:any){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async getBlogs(req:Request, res:Response){
        try{
            const blogs: Object[] = await Blog.find()
            return res.json({blogList: blogs})
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async getBlog(req:Request, res:Response){
        const id = new ObjectId(req.params.id)
        try{
            const blog = await Blog.findOne({_id:id})
            if(blog){
                return res.json({blog:blog})
            }else{
                return res.status(404).json({msg:"Blog not found"})
            }
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async updateBlog(req:Request, res:Response){
        const formData = req.body
        const id = new ObjectId(formData.id)
        const title:string = formData.title
        const content:string = formData.content
    
        try{
            const updatedDoc = await Blog.findByIdAndUpdate(id,{title,content},{new:true})
            if(updatedDoc){
                return res.json({msg:"Blog updated successfully"})
            }else{
                return res.status(404).json({msg:"Blog not found"})
            }
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async deleteBlog(req:Request, res:Response){
        const id = new ObjectId(req.params.id)
        try{
            const deletedDoc = await Blog.findByIdAndDelete(id)
            if(deletedDoc){
                return res.json({msg:"Blog deleted successfully"})
            }else{
                return res.status(404).json({msg:"Blog not found"})
            }
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async like(req:Request, res:Response){
        const formData = req.body
        const userId:string = formData.userId
        const blogId:string = formData.blogId
    
        try{
            const like = await Like.findOne({blogId,userId})
            if(like){
                const deleted = await Like.findByIdAndDelete(like._id)
                return res.json({msg:"Like deleted"})
            }else{
                const newLike = Like({
                    userId,
                    blogId
                })
                await newLike.save()
                return res.json({msg:"Like saved successfully"})
            }        
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async dislike(req:Request, res:Response){
        const formData = req.body
        const userId:string = formData.userId
        const blogId:string = formData.blogId
    
        try{
            const dislike = await Dislike.findOne({blogId,userId})
            if(dislike){
                const deleted = await Dislike.findByIdAndDelete(dislike._id)
                return res.json({msg:"Dislike deleted"})
            }else{
                const newDislike = Dislike({
                    userId,
                    blogId
                })
                await newDislike.save()
                return res.json({msg:"Dislike saved successfully"})
            }    
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
}

module.exports = {
    blogController
}