import { describe, expect, it, jest } from '@jest/globals';
const { userMgtController } = require('../controllers/UserMgtController')
const { updateUsernameSchema, updatePasswordSchema, updateEmailSchema } = require("../validationSchema/UserSchema")

const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
jest.mock('../models/UserModel')
jest.mock('bcrypt')
jest.mock("../validationSchema/UserSchema")


const res:any = {}

res.json = jest.fn((x:Object) => x),
res.status = jest.fn((x:number) => res)

const req = {
    body:{
        id: "65f47d055e66592dd6c5b7c1",
        newUsername: "jmk123",
        newPassword: "hash",
        oldPassword: "hash",
        password: "hash",
        newEmail: "test@gmail.com"
    },
    params:{
        id:"65f47d055e66592dd6c5b7c1"
    }
}

const mockUsers = [{
        id:"1234567",
        username: "kmj123",
        password: "hashed password",
        email:"kmj@gmail.com"
    },{
        id:"7654321",
        username: "kmj4321",
        password: "hashed password",
        email:"jmk@gmail.com"
    }
]

describe("UserMgt Controller", () => {
    it("should get all users successfully", async () => {
        User.find.mockImplementationOnce(() => (mockUsers))

        await userMgtController.getUsers(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({userList: mockUsers})
    })

    it("should delete a user successfully", async () => {
        User.findByIdAndDelete.mockImplementationOnce(() => ({
            id:"7654321",
            username: "kmj4321",
            password: "hashed password",
            email:"jmk@gmail.com"
        }))

        await userMgtController.deleteUser(req,res)

        expect(res.status).toHaveBeenCalledWith(204)
    })

    it("should update username successfully", async () => {
        updateUsernameSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockImplementationOnce(() => ({
            id:"7654321",
            username: "kmj4321",
            password: "hashed password",
            email:"jmk@gmail.com"
        }))
        bcrypt.compare.mockResolvedValueOnce(true)
        User.findByIdAndUpdate.mockImplementationOnce(() => ({
            id:"7654321",
            username: "kmj4321",
            password: "hashed password",
            email:"jmk@gmail.com"
        }))

        await userMgtController.updateUsername(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({msg: "Username successfully updated"})
    })

    it("should update password successfully", async () => {
        updatePasswordSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockImplementationOnce(() => ({
            id:"7654321",
            username: "kmj4321",
            password: "hashed password",
            email:"jmk@gmail.com"
        }))
        bcrypt.compare.mockResolvedValueOnce(true)
        bcrypt.hash.mockResolvedValueOnce("hash")
        User.findByIdAndUpdate.mockImplementationOnce(() => ({
            id:"7654321",
            username: "kmj4321",
            password: "hashed password",
            email:"jmk@gmail.com"
        }))

        await userMgtController.updatePassword(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({msg: "Password successfully updated"})
    })

    it("should update email successfully", async () => {
        updateEmailSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockImplementationOnce(() => ({
            id:"7654321",
            username: "kmj4321",
            password: "hashed password",
            email:"jmk@gmail.com"
        }))
        bcrypt.compare.mockResolvedValueOnce(true)
        User.findByIdAndUpdate.mockImplementationOnce(() => ({
            id:"7654321",
            username: "kmj4321",
            password: "hashed password",
            email:"jmk@gmail.com"
        }))

        await userMgtController.updateEmail(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({msg: "Email successfully updated"})
    })

    it("should return a 404 on delete operation with unmatching id", async () => {
        User.findByIdAndDelete.mockImplementationOnce(() => null)

        await userMgtController.deleteUser(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({msg: 'User not found'})
    })

    it("should handle errors during get users", async () => {
        User.find.mockImplementationOnce(() => {throw new Error('DB Error')})

        await userMgtController.getUsers(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"})
    })

    it("should handle errors during delete user", async () => {
        User.findByIdAndDelete.mockImplementationOnce(() => {throw new Error('DB Error')})

        await userMgtController.deleteUser(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"})
    })

    it("should handle errors during update username", async () => {
        updateUsernameSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockImplementationOnce(() => {throw new Error('DB Error')})

        await userMgtController.updateUsername(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"})
    })

    it("should handle errors during update password", async () => {
        updatePasswordSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockImplementationOnce(() => {throw new Error('DB Error')})

        await userMgtController.updatePassword(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"})
    })

    it("should handle errors during update email", async () => {
        updateEmailSchema.validate.mockResolvedValueOnce({error:""})
        User.findOne.mockImplementationOnce(() => {throw new Error('DB Error')})

        await userMgtController.updateEmail(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"})
    })
})
