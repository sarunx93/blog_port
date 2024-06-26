import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, 'Please provide lastname'],
        trim:true,
        default:'lastname'
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        select: false
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message:'Please provide a valid email'
        }
    }
})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)