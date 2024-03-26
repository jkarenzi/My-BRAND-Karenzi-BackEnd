import { describe, expect, it, jest } from '@jest/globals';
const { blogController } = require('../controllers/BlogController')
const { createBlogValidationSchema, updateBlogValidationSchema, blogActionValidationSchema } = require("../validationSchema/BlogSchema")
const Blog = require('../models/BlogModel')
const Like = require("../models/LikeModel")
const Dislike = require('../models/DislikeModel')
jest.mock("cloudinary")
const cloudinary = require("cloudinary")
jest.mock("../models/BlogModel")
jest.mock("../validationSchema/BlogSchema")
jest.mock("../models/DislikeModel")
jest.mock("../models/LikeModel")

const res:any = {}

res.json = jest.fn((x:Object) => x),
res.status = jest.fn((x:number) => res)

const req = {
    body:{
        id:"65f47d055e66592dd6c5b7c1",
        title:"the impact of ai",
        content:"the impact of ai on software devt.....",
        likes:1,
        dislikes:2,
        comments: 3,
        userId:"1234567",
        blogId:"1234567"
    },
    params:{
        id:"65f47d055e66592dd6c5b7c1"
    },
    files:{
        image:[{ buffer: Buffer.from('mock-image-data') }]
    }
}

const mockBlogs = [{
        id:"123456",
        title:"the impact of ai",
        content:"the impact of ai on software devt.....",
        likes:1,
        dislikes:2,
        comments: 3
    },{
        id:"654321",
        title:"the impact of ai",
        content:"the impact of ai on software devt.....",
        likes:1,
        dislikes:2,
        comments: 3
    }
]

describe("Blog Controller", () => {
    it("should create a new blog successfully", async () => {
        createBlogValidationSchema.validate.mockResolvedValueOnce({error:""})

        cloudinary.uploader.upload_stream.mockImplementationOnce(() => ({
            url: 'https://example.com/image.jpg'  // Mock successful upload
        }));

        await blogController.createBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({msg:"Blog saved successfully"})
    })

    it("should get all blogs", async () => {
        Blog.find.mockImplementationOnce(() => (
            mockBlogs
        ))
        
        await blogController.getBlogs(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({blogList: mockBlogs})
    })

    it("should get a single blog", async () => {
        Blog.findOne.mockImplementationOnce(() => ({
            id:"654321",
            title:"the impact of ai",
            content:"the impact of ai on software devt.....",
            likes:1,
            dislikes:2,
            comments: 3
        }))
        
        await blogController.getBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({blog:{id:"654321",title:"the impact of ai",content:"the impact of ai on software devt.....",likes:1,dislikes:2,comments: 3}})
    })

    it("should update a blog successfully", async () => {
        updateBlogValidationSchema.validate.mockResolvedValueOnce({error:""})

        cloudinary.uploader.upload_stream.mockImplementationOnce(() => ({
             url: 'https://example.com/image.jpg'  // Mock successful upload
        }));

        Blog.findByIdAndUpdate.mockImplementationOnce(() => ({
            id:"654321",
            title:"the impact of ai",
            content:"the impact of ai on software devt.....",
            imageUrl:"https://dummy.png",
            likes:1,
            dislikes:2,
            comments: 3
        }))

        await blogController.updateBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({msg:"Blog updated successfully"})
    })

    it("should delete a blog successfully", async () => {
        Blog.findByIdAndDelete.mockImplementationOnce(() => ({
            id:"654321",
            title:"the impact of ai",
            content:"the impact of ai on software devt.....",
            likes:1,
            dislikes:2,
            comments: 3
        }))

        await blogController.deleteBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(204)
    })

    it("should handle errors during create blog", async () => {
        createBlogValidationSchema.validate.mockResolvedValueOnce({error:""})
        await blogController.createBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })

    it("should handle errors during delete blog", async () => {
        Blog.findByIdAndDelete.mockImplementationOnce(() => {throw new Error("DB Error")})
        await blogController.deleteBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })

    it("should handle errors during get blog", async () => {
        Blog.find.mockImplementationOnce(() => {throw new Error('DB error')})
        
        await blogController.getBlogs(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })

    it("should return a 404 on delete operation if id provided doesnt match any blog", async () => {
        Blog.findByIdAndDelete.mockImplementationOnce(() => null)

        await blogController.deleteBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: "Blog not found"})  
    })

    it("should return a 404 on get operation if id provided doesnt match any blog", async () => {
        Blog.findOne.mockImplementationOnce(() => null)

        await blogController.getBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: "Blog not found"})  
    })

    it("should return a 404 on update operation if id provided doesnt match any blog", async () => {
        updateBlogValidationSchema.validate.mockResolvedValueOnce({error:""})

        cloudinary.uploader.upload_stream.mockImplementationOnce((callback:any) => {
            callback(null, { url: 'https://example.com/image.jpg' }); // Mock successful upload
        })

        Blog.findByIdAndUpdate.mockImplementationOnce(() => null)

        await blogController.updateBlog(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: "Blog not found"})
    })

    it("should like blog successfully", async () => {
        blogActionValidationSchema.validate.mockResolvedValueOnce({error:""})

        await blogController.like(req,res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({msg: "Like saved successfully"})
    })

    it("should dislike blog successfully", async () => {
        blogActionValidationSchema.validate.mockResolvedValueOnce({error:""})

        await blogController.dislike(req,res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({msg: "Dislike saved successfully"})
    })

    it("should undo like", async () => {
        blogActionValidationSchema.validate.mockResolvedValueOnce({error:""})
        Like.findOne.mockImplementationOnce(() => ({
            userId: "12345",
            blogId: "12345",
            id: "1234567"
        }))
        Like.findByIdAndDelete.mockImplementationOnce(() => ({
            userId: "12345",
            blogId: "12345",
            id: "1234567"
        }))
        Like.countDocuments.mockResolvedValueOnce(5)
        Blog.findByIdAndUpdate.mockImplementationOnce(() => ({
            id:"654321",
            title:"the impact of ai",
            content:"the impact of ai on software devt.....",
            likes:1,
            dislikes:2,
            comments: 3
        }))

        await blogController.like(req,res)

        expect(res.status).toHaveBeenCalledWith(204)
    })

    it("should undo dislike", async () => {
        blogActionValidationSchema.validate.mockResolvedValueOnce({error:""})
        Dislike.findOne.mockImplementationOnce(() => ({
            userId: "12345",
            blogId: "12345",
            id: "1234567"
        }))
        Dislike.findByIdAndDelete.mockImplementationOnce(() => ({
            userId: "12345",
            blogId: "12345",
            id: "1234567"
        }))
        Dislike.countDocuments.mockResolvedValueOnce(5)
        Blog.findByIdAndUpdate.mockImplementationOnce(() => ({
            id:"654321",
            title:"the impact of ai",
            content:"the impact of ai on software devt.....",
            likes:1,
            dislikes:2,
            comments: 3
        }))

        await blogController.dislike(req,res)

        expect(res.status).toHaveBeenCalledWith(204)
    })
})