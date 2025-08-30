const jwt = require("jsonwebtoken")
const bycrypt = require("bcrypt")
const User = require("../models/User")

const SECRET_KEY = "your_secret_key";



exports.registerUser = async(req,res) => {
    try{
        const {username,password} = req.body;

        const existingUser = await User.findOne({username})

        if(existingUser){
           return res.status(400).json({message:"User already exists"})
        }

        const hashPassword = await bycrypt.hash(password,10)
        const newUser = new User({username,password:hashPassword})
        await newUser.save()

         res.status(201).json({ message: "User registered successfully" });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Server Error"})
    }
}

exports.loginUser = async(req,res) => {
    try{
        const {username,password} = req.body

        const isuser = await User.findOne({username})

        if(!isuser){
            return res.status(401).json({message:"No User Exists"})
        }

        const isMatch = await bycrypt.compare(password,isuser.password)

        if(!isMatch){
            return res.status(401).json({message:"Invalid Password"})
        }

        const token = jwt.sign({username}, SECRET_KEY, {expiresIn:"1h"})
        res.json({token})
    }
    catch(error){
            return res.status(500).json({message:"Server Error"})
    }
}