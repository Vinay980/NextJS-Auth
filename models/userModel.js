import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide a username"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:String,
    verifyToken:String,
    verifyTokenExpiry:String,

})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User