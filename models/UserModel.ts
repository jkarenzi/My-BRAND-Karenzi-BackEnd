import { Schema, model } from "mongoose"

interface IUser {
    username:string,
    password:string,
    email:string,
    isAdmin?:boolean,
    imageUrl?:string
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
    },
    imageUrl:{
        type:String,
        default: "https://res.cloudinary.com/ditrc0kph/image/upload/v1711450197/rgrjpswkhjey1xgunqhr.png"
    }
},{timestamps: true})

module.exports = model('User', UserSchema)