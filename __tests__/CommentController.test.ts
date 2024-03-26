import { describe, expect, it, jest } from '@jest/globals';
const { commentController } = require('../controllers/CommentController')
const { createCommentValidationSchema, updateCommentValidationSchema } = require("../validationSchema/CommentSchema")
const Comment = require("../models/CommentModel")
const Blog = require('../models/BlogModel')
jest.mock("../models/CommentModel")
jest.mock("../models/BlogModel")
jest.mock("../validationSchema/CommentSchema")

const res:any = {}

res.json = jest.fn((x:Object) => x),
res.status = jest.fn((x:number) => res)

const req = {
    body:{
        id:"65f47d055e66592dd6c5b7c1",
        userId:"987654321",
        blogId: "gggggggg",
        comment: "Impressive!"
    },
    params:{
        id:"65f47d055e66592dd6c5b7c1"
    }
}

const mockComments = [{
        id: "123456789",
        userId: "12345",
        blogId: "98765432",
        comment: "Nice!"
    },{
        id: "987654321",
        userId: "54321",
        blogId: "gggggggg",
        comment: "Impressive!"
    }
]


describe("Comment Controller", () => {
    it("should create a new comment", async () => {
        createCommentValidationSchema.validate.mockResolvedValueOnce({error:""})

        await commentController.createComment(req,res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({msg: "Comment saved successfully"})
    })

    it("should get all comments", async () => {
        Comment.find.mockImplementationOnce(() => (
            mockComments
        ))
        
        await commentController.getComments(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({commentList: mockComments})
    })

    it("should update an existing comment", async () => {
        updateCommentValidationSchema.validate.mockResolvedValueOnce({error:""})

        Comment.findByIdAndUpdate.mockImplementationOnce(() => ({
            id: "987654321",
            userId: "54321",
            blogId: "gggggggg",
            comment: "Impressive!"
        }))

        await commentController.updateComment(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({msg: "Comment successfully updated"})  
    })

    it("should delete a comment successfully", async () => {
        Comment.findOne.mockImplementationOnce(() => ({
            id: "987654321",
            userId: "54321",
            blogId: "gggggggg",
            comment: "Impressive!"
        }))

        Comment.findByIdAndDelete.mockImplementationOnce(() => ({
            id: "987654321",
            userId: "54321",
            blogId: "gggggggg",
            comment: "Impressive!"
        }))

        Comment.countDocuments.mockResolvedValueOnce(5)
        Blog.findByIdAndUpdate.mockImplementationOnce(() => ({
            id:"123456",
            title:"the impact of ai",
            content:"the impact of ai on software devt.....",
            likes:1,
            dislikes:2,
            comments: 3
        }))

        await commentController.deleteComment(req,res)

        expect(res.status).toHaveBeenCalledWith(204)
        expect(res.json).toHaveBeenCalledWith({})
    })

    it("should return a 404 on delete operation if the id provided doesnt match any comment", async () => {
        Comment.findOne.mockImplementationOnce(() => null)
        Comment.findByIdAndDelete.mockImplementationOnce(() => null)

        await commentController.deleteComment(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: "Comment not found"})  
    })

    it("should return a 404 on update operation if the id provided doesnt match any comment", async () => {
        updateCommentValidationSchema.validate.mockResolvedValueOnce({error:""})

        Comment.findByIdAndUpdate.mockImplementationOnce(() => null)

        await commentController.updateComment(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: "Comment not found"})  
    })

    it("should handle errors during create comment", async () => {
        createCommentValidationSchema.validate.mockResolvedValueOnce({error:""})

        await commentController.createComment(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })

    it("should handle errors during delete comment", async () => {
        Comment.findOne.mockImplementationOnce(() => null)
        Comment.findByIdAndDelete.mockImplementationOnce(() => {throw new Error('DB error')})

        await commentController.deleteComment(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })

    it("should handle errors during update comment", async () => {
        updateCommentValidationSchema.validate.mockResolvedValueOnce({error:""})

        Comment.findByIdAndUpdate.mockImplementationOnce(() => {throw new Error('DB error')})

        await commentController.updateComment(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })

    it("should handle errors during get comments", async () => {
        Comment.find.mockImplementationOnce(() => {throw new Error('DB error')})

        await commentController.getComments(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })
})