import { Schema, model } from "mongoose"

interface IUser {
    username:string,
    password:string,
    email:string,
    isAdmin?:boolean
}

const UserSchema = new Schema<IUser>({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps: true})

module.exports = model('User', UserSchema)