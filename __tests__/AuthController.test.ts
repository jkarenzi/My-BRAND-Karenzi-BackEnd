import { describe, expect, it, jest } from '@jest/globals';
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { authController } = require('../controllers/AuthController')
const { signupValidationSchema } = require("../validationSchema/SignupSchema")

const User = require('../models/UserModel')
jest.mock('../models/UserModel')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('../validationSchema/SignupSchema')

const res:any = {}

res.json = jest.fn((x:Object) => x),
res.status = jest.fn((x:number) => res)

const req = {
    body:{
        username:"testuser",
        password: "1234567",
        email: "testuser2gmail.com"
    }
}


describe("Auth Controller", () => {
     //it("should return an error for failed validation on signup", async () => {
        //signupValidationSchema.validate.mockResolvedValueOnce({error:"username should be > 5 chars"})

        //await authController.signUp(req,res)

        //expect(res.status).toHaveBeenCalledWith(400)
        //expect(res.json).toHaveBeenCalledWith({msg: "username should be > 5 chars"})
    //})

    it("should return an error for existing username", async () => {
        signupValidationSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockImplementationOnce(() => ({
            id: '1',
            username: req.body.username,
            password: "password",
            email: "testuser2@gmail.com"
        }))

        await authController.signUp(req,res)

        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.json).toHaveBeenCalledWith({msg: "Username already in use"})
    })

    it("should return an error for existing email", async () => {
        signupValidationSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockResolvedValueOnce(null)

        User.findOne.mockImplementationOnce(() => ({
            id: '1',
            username: "testuser1",
            password: "password",
            email: req.body.email
        }))

        await authController.signUp(req,res)

        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.json).toHaveBeenCalledWith({msg: "Email already in use"}) 
    })

    it("successful signUp", async () => {
        signupValidationSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockResolvedValueOnce(null)
        User.findOne.mockResolvedValueOnce(null)

        bcrypt.hash.mockResolvedValueOnce("hashed password")

        // const newUser = User({
        //     username:req.body.username,
        //     password: req.body.password,
        //     email: req.body.email,
        // })

        // newUser.save = jest.fn(() => User)

        // newUser.save.mockImplementationOnce(() => Promise.resolve())

        //jest.spyOn(User.prototype, 'save').mockResolvedValueOnce(Promise.resolve());

        await authController.signUp(req,res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({msg: "Signup successful"})
    })
    
    it("successful login", async () => {
        User.findOne.mockImplementationOnce(() => ({
            id: '1',
            username: "testuser",
            password: "password",
            email: "testuser2@gmail.com"
        }))

        bcrypt.compare.mockResolvedValueOnce(true)

        jwt.sign.mockResolvedValueOnce("eyGvvnroev")

        await authController.login(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({msg: "Login successful",token:"eyGvvnroev"})
    })

    it("should return an error if account with provided username doesn't exist", async () => {
        User.findOne.mockResolvedValueOnce(null)

        await authController.login(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: "Could not find any account with matching username"}) 
    })

    it("failed login", async () => {
        User.findOne.mockImplementationOnce(() => ({
            id: '1',
            username: "testuser",
            password: "password",
            email: "testuser2@gmail.com"
        }))

        bcrypt.compare.mockResolvedValueOnce(false)

        await authController.login(req,res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({msg: "Incorrect password"})
    })

    it("should handle errors during signup", async () => {
        signupValidationSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockResolvedValueOnce(null)
        User.findOne.mockResolvedValueOnce(null)

        bcrypt.hash.mockImplementationOnce(() => {throw new Error('DB error')})
        await authController.signUp(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"})
    })

    it("should handle errors during login", async () => {
        User.findOne.mockImplementationOnce(() => {throw new Error('DB error')})

        await authController.login(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"})
    })
})