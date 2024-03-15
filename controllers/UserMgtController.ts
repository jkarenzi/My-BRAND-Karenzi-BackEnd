const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
import { Request, Response } from 'express';
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

class userMgtController {
    static async getUsers(req:Request, res:Response) {
        try{
            const users: Object[] = await User.find()
            return res.json({userList: users})
        }catch(err){
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async deleteUser(req:Request, res:Response) {
        const id = new ObjectId(req.params.id)
        try{
            const deletedUser = await User.findByIdAndDelete(id)
            if(!deletedUser){
                return res.status(404).json({msg: "User not found"})
            }
    
            return res.json({msg: "User successfully deleted"})
        }catch(err:any){
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async updateUsername(req:Request, res:Response){
        const formData = req.body
        const id = new ObjectId(formData.id)
        const newUsername:string = formData.newUsername
        const password:string = formData.password
        try{
            const user = await User.findOne({_id:id})
            if(user){
                const passwordMatch:boolean = await bcrypt.compare(password, user.password);
                if(passwordMatch){
                    const updatedDoc = await User.findByIdAndUpdate(id,{username: newUsername},{new:true})
                    if(updatedDoc){
                        return res.json({msg: "Username successfully updated"})
                    }else{
                        return res.json({msg: "Update unsuccessful"})
                    }
                }else{
                    return res.json({msg: "Incorrect password"})
                }
            }else{
                return res.json({msg: "User not found"})
            }
        }catch(err:any){
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async updatePassword(req:Request, res:Response){
        const formData = req.body
        const id = new ObjectId(formData.id)
        const oldPassword:string = formData.oldPassword
        const newPassword:string = formData.newPassword
        try{
            const user = await User.findOne({_id:id})
            if(user){
                const passwordMatch:boolean = await bcrypt.compare(oldPassword, user.password);
                if(passwordMatch){
                    const hashedPassword = await bcrypt.hash(newPassword, 10)
                    const updatedDoc = await User.findByIdAndUpdate(id,{password: hashedPassword},{new:true})
                    if(updatedDoc){
                        return res.json({msg: "Password successfully updated"})
                    }else{
                        return res.json({msg: "Update unsuccessful"})
                    }
                }else{
                    return res.json({msg: "Incorrect password"})
                }
            }else{
                return res.json({msg: "User not found"})
            }
        }catch(err:any){
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async updateEmail(req:Request, res:Response){
        const formData = req.body
        const id = new ObjectId(formData.id)
        const password:string = formData.password
        const newEmail:string = formData.newEmail
        try{
            const user = await User.findOne({_id:id})
            if(user){
                const passwordMatch:boolean = await bcrypt.compare(password, user.password);
                if(passwordMatch){
                    const updatedDoc = await User.findByIdAndUpdate(id,{email:newEmail},{new:true})
                    if(updatedDoc){
                        return res.json({msg: "Email successfully updated"})
                    }else{
                        return res.json({msg: "Update unsuccessful"})
                    }
                }else{
                    return res.json({msg: "Incorrect password"})
                }
            }else{
                return res.json({msg: "User not found"})
            }
        }catch(err:any){
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = {
    userMgtController
}