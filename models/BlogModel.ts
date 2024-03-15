import { Schema, model } from "mongoose"

interface IBlog {
    title:string,
    content:string,
    likes?: number,
    dislikes?: number
    comments?: number
}

const BlogSchema = new Schema<IBlog>({
    title:{
        type:String,
        required: true
    },
    content:{
        type: String,
        required:true
    },
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type: Number,
        default: 0
    },
    comments:{
        type:Number,
        default:0
    }
},{timestamps: true})

module.exports = model('Blog', BlogSchema)