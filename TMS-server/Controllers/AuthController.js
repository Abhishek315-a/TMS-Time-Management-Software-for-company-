const bcrypt = require("bcrypt");
const UserModel  =require("../Models/User");
const jwt = require("jsonwebtoken");

const signup = async (req ,res)=>{
    try{
        const {name,email,password,role}= req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(409).json({message:"User is already exist,You can Login directly",success:false});
        }
        const userModel = new UserModel({name,email,password,role});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({
            message:"SignUp succesfully",
            success:true 
        })
    }
    catch(err){
        res.status(500).json({
            message:err,
            success:false
        })
    }
}

const login = async (req ,res)=>{
    try{
        const {email,password,role}= req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(403).json({
                message:"Email or Password Incorrect",
                success:false
            });
        }
        const isPasswordEqual = await bcrypt.compare(password,user.password);
        if(!isPasswordEqual || role!==user.role){
            return res.status(403).json({
                message:"Email, Password or Role Incorrect",
                success:false
            });
        }

        const jwtToken = jwt.sign({email: user.email, _id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(201).json({
            message:"Login succesfully",
            success:true ,
            jwtToken,
            email,
            name:user.name,
            role:user.role,
        })
    }
    catch(err){
        res.status(500).json({
            message:"Login failed",
            success:false
        })
    }
}

module.exports = {
    signup,
    login
}