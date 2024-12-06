import mongoose from "mongoose"
import bcrypt from "bcrypt"



const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"username is required"],
            trim:true,
            unique:true
        },
        email:{
            type:String,
            required:[true,"email is required"],
            trim:true,
            unique:true

        },
        password:{
            type:String,
            required:[true,"password is required"],
            unique:true,
            minlength:6
        },
    },
    {
        timestamps:true
    }
)

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);


})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


export const User = mongoose.model("User",userSchema)