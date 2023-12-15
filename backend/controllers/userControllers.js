import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const getAllUsers = async (req , res) => {

    try {

        const users = await User.find({});

        res.status(200).json({users :  users});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const addUser = async (req , res) => {

    const {username , email , password} = req.body;

    try {

        let encrypted = await bcrypt.hash(password , 12);

        const user = await User.create({username , email , password : encrypted});

        res.status(200).json({user : user , message: "Registered"});

    } catch (error) {
        res.status(500).json({error : error , message: "Error occured"});   
    }
}

export const loginUser = async (req , res) => {

    const {email , password} = req.body;

    try {

        const user = await User.findOne({email : email});

        if(!user){
            return res.status(400).json({message : "User not found"});
        }

        const check = await bcrypt.compare(password , user.password);
        if(!check){
            return res.status(400).json({message : "Incorrect password"});
        }

        const token = jwt.sign({user : {id : user._id}} , process.env.JWT_SECRET1 , {expiresIn: "600s"});

        res.cookie("token" , token , {
            httpOnly: true,
            expiresIn: Date.now() + 5*60*1000
        });

        res.status(200).json({user : user , message: "Logged In" , token : token});

    } catch (error) {
        res.status(500).json({error : error , message: "Error occured"});   
    }
}

export const sendMail = async (req , res) => {

    const {email} = req.body;

    try {

        const user = await User.findOne({email : email});
        if(!user){
            return res.status(404).json({message : "No user found"});
        }

        const resetToken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "smeet.br.chavan7@gmail.com",
                pass: process.env.EMAIL_PASSWORD,
            }
        });


        const mailOptions = {
            from: {
                name: "Smeet Chavan",
                address: "smeet.br.chavan7@gmail.com"
            },
            to: user.email,
            subject: "Password Reset Request",
            html: `<h3>You are receiving this email because you requested a password reset. Please click on the following link to reset your password: http://localhost:5173/newpassword/${resetToken}</h3>`
        }

        await transporter.sendMail(mailOptions);

        const tokenJWT = jwt.sign({user: {id : user._id}} , process.env.JWT_SECRET2 , {expiresIn: "600s"});
        res.cookie("resetTokenJWT" , tokenJWT , {httpOnly: true, expiresIn: Date.now() + 5*60*1000});

        res.status(200).json({ message: `Reset email sent to ${user.email}` , resetToken});

    } catch (error) {
        res.status(500).json({error : error , message: error.message});
    }
}

export const resetPassword = async (req , res) => {

    const {resetToken} = req.params;
    const {password} = req.body;

    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    try {

        const user = await User.findOne({
            resetPasswordToken : resetTokenHash,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        });

        if(!user){
            return res.status(401).json({message: "Invalid reset token"});
        }

        user.password = await bcrypt.hash(password , 12);;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({message: "Password reset successfully"});

    } catch (error) {
        res.status(500).json({error : error , message: error.message});
    }
}

export const logout = async (req , res) => {
    res.clearCookie("token");
    res.status(200).send("Ok");
}