import { Schema, model } from "mongoose"

interface IDislike {
    userId: string,
    blogId: string,
}

const DislikeSchema = new Schema<IDislike>({
    userId:{
        type: String,
        required: true
    },
    blogId:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = model('Dislike', DislikeSchema)