import { Schema, model } from "mongoose"

interface ILike {
    userId: string,
    blogId: string,
}

const LikeSchema = new Schema<ILike>({
    userId:{
        type: String,
        required: true
    },
    blogId:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = model('Like', LikeSchema)