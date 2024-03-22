import { Schema, model } from "mongoose"

interface IQuery {
    userId: string,
    query: string,
}

const QuerySchema = new Schema<IQuery>({
    userId:{
        type: String,
        required: true
    },
    query:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = model('Query', QuerySchema)