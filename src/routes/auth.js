const express = require('express');
const authRouter = express.Router();

const { validateRegistration } = require('../utils/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');

authRouter.post('/register', async (req, res)=>{
    try{
       validateRegistration(req);
       const { firstName, lastName, email, phone, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            password: passwordHash
        });

        const savedUser = await user.save();

        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 3*24*60*60*1000), // 3 days in ms
            httpOnly: true, // secure from client-side scripts
            sameSite: 'strict', // protect from CSRF
            secure: process.env.NODE_ENV === 'production' // only over HTTPS in production
        });

        res.json({
            message: "user registered successfully.",
            data: savedUser
        })
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post('/login', async (req, res)=>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordHash = await user.validatePassword(password);

        if(!isPasswordHash){
            throw new Error("Invalid credentials");
        }

        const token = await user.getJWT();
        
        res.cookie('token', token, {
            expires: new Date(Date.now() + 3*24*60*60*1000)
        })
        res.send(user);
    }catch(err){

    }
})

authRouter.post('/logout', async (req,res)=>{
    res.cookie('token', null, {
        expires: new Date(Date.now())
    });
    res.send("logout successfully!")
});


module.exports = authRouter;

















