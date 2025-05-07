const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Enter the valid email");
            }
        }
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(val){
            if(!validator.isMobilePhone(val)){
                throw new Error("Enter a valid phone number.")
            }
        }
      },
      password: {
        type: String,
        required: true,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.")
            }
        }
      },
    }, { timestamps: true }
);  

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare( passwordInputByUser, passwordHash );

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);






















