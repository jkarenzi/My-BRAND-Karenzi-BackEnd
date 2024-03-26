import { describe, expect, it, jest } from '@jest/globals';
const { queryController } = require('../controllers/QueryController')
const { createQueryValidationSchema } = require("../validationSchema/QuerySchema")
const Query = require("../models/QueryModel")
jest.mock("../models/QueryModel")
jest.mock("../validationSchema/QuerySchema")

const res:any = {}

res.json = jest.fn((x:Object) => x),
res.status = jest.fn((x:number) => res)

const req = {
    body:{
        userId:"1234",
        query:"Hello"
    },
    params:{
        id:"65f47d055e66592dd6c5b7c1"
    }
}

const mockQueries = [{
        id: "123456789",
        userId: "12345",
        query: "How are you?"
    },{
        id: "12345",
        userId: "4",
        query: "How can i contact you?"
    }
]


describe("Query Controller", () => {
    it("should create a new query", async () => {
        createQueryValidationSchema.validate.mockResolvedValueOnce({error:""})

        await queryController.createQuery(req,res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({msg: "Query saved successfully"})
    })

    it("should get all queries", async () => {
        Query.find.mockImplementationOnce(() => (
            mockQueries
        ))
        
        await queryController.getQueries(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({queryList: mockQueries})
    })

    it("should get a single query", async () => {
        Query.findOne.mockImplementationOnce(() => ({
            id: "123456789",
            userId: "12345",
            query: "How are you?"
        }))

        await queryController.getQuery(req,res)
        
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({id: "123456789",userId: "12345",query: "How are you?"})
    })

    it("should return an error for failed validation on create query", async () => {
        createQueryValidationSchema.validate.mockResolvedValueOnce({error:"Userid should have 24 chars"})

        await queryController.createQuery(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({msg:"Userid should have 24 chars"})
    })

    it("should return an error if no query with corresponding id exists", async () => {
        Query.findOne.mockImplementationOnce(() => null)

        await queryController.getQuery(req,res)
        
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: "Query not found"})
    })

    it("should handle errors during create query", async () => {
        createQueryValidationSchema.validate.mockImplementationOnce(() => {throw new Error('Validation error')})

        await queryController.createQuery(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })

    it("should handle errors during get query", async () => {
        Query.find.mockImplementationOnce(() => {throw new Error('DB error')})
        
        await queryController.getQueries(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({msg: "Internal server error"})
    })
})