const Query = require("../models/QueryModel")
import { Request, Response } from 'express';
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
const { createQueryValidationSchema } = require("../ValidationSchema/QuerySchema")

class queryController {
    static async createQuery(req:Request, res:Response){
        const formData = req.body;

        const validationResult = createQueryValidationSchema.validate(formData)
        if(validationResult.error){
            return res.status(400).json({msg:validationResult.error.details[0].message})
        }

        const userId:string = formData.userId
        const query:string = formData.query
    
        const newQuery = Query({
            userId,
            query
        })
    
        try{
            await newQuery.save()
            return res.status(201).json({msg: "Query saved successfully"})
        }catch(err: any){
            console.log(err)
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async getQueries(req:Request, res:Response){
        try{
            const queries: Object[] = await Query.find()
            return res.status(200).json({queryList: queries})
        }catch(err){
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    
    static async getQuery(req:Request, res:Response){
        const id = new ObjectId(req.params.id)
    
        try{
            const query = await Query.findOne({_id:id})
            if(query){
                return res.status(200).json(query)
            }else{
                return res.status(404).json({msg: 'Query not found'})
            }
        }catch(err:any){
            return res.status(500).json({msg: "Internal Server Error"})
        }
    }
}

module.exports = {
    queryController
}