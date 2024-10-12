import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim: true,
        maxLength: 50,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        unique:true,
        lowercase:true,
        maxLength: 100,
    },
    mobileNumber:{
        type:String,
        required:true,
        trim: true,
        unique:true,
        minLength: 10,
    },
    skills:{
        type: [String],
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength: 8,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
});

// Hash password before saving data to the database

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
         return next();
    }


    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
       next(error); 
    }
});

// Method to compare entered password with hashed password in the database

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;