import { Schema, model } from "mongoose"

interface IComment {
    userId: string,
    blogId: string,
    comment: string
}

const CommentSchema = new Schema<IComment>({
    userId:{
        type: String,
        required: true
    },
    blogId:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = model('Comment', CommentSchema)