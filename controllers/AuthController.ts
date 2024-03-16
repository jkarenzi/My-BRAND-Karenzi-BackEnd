const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
import { Request, Response } from 'express';
require('dotenv').config()
const Joi = require('joi')
const { signupValidationSchema } = require("../validationSchema/SignupSchema")

class authController {
    static async signUp(req:Request, res:Response) {
        const formData = req.body

        const validationResult = signupValidationSchema.validate(formData)

        if(validationResult.error){
            return res.status(400).json({msg:validationResult.error.details[0].message})
        }
    
        let user = await User.findOne({username: formData.username})
        if(user){
            return res.status(409).json({msg:"Username already in use"})
        }
    
        user = await User.findOne({email: formData.email})
        if(user){
            return res.status(409).json({msg: "Email already in use"})
        }
        
        try{
            const hashedPassword = await bcrypt.hash(formData.password, 10)
    
            const newUser = User({
                username: formData.username,
                password: hashedPassword,
                email: formData.email
            })
    
            await newUser.save()
            return res.status(202).json({msg: "Signup successful!"})
        }catch(err: any){
            console.log(err)
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async login(req:Request, res:Response){
        const formData = req.body
        try{
            const user = await User.findOne({username: formData.username})
            if(user){
                const passwordMatch:boolean = await bcrypt.compare(formData.password, user.password);
                if(passwordMatch){
                    const token:string = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).json({msg: "Login successful", token: token})
                }else{
                    return res.status(401).json({msg: "Incorrect password"})
                }
            }else{
                return res.status(404).json({msg: "Could not find any account with matching username"})
            }
        }catch(err:any){
            console.log(err.message)
            return res.status(500).json({ message: 'Internal server error' });
        }  
    }   
}

module.exports = {
    authController
}