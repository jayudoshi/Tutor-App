const express = require('express');
const cors = require('../cors');
const {sendOTP} = require('../otp')

const Otps = require('../models/otp');
const Users = require('../models/users');
const { getJWT } = require('../authenticate');

const otpRouter = express.Router();

otpRouter.options('/generateOTP' , cors.cors , (req,res,next) => {res.sendStatus("200")});
otpRouter.post('/generateOTP' , cors.corsWithOpts , (req,res,next) => {
    if(req.body.phoneNo){
        Users.findOne({phoneNo:req.body.phoneNo} , (err,user) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Bad Request" , err:err})
            }else{
                if(!user){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','application/json');
                    const err = new Error("Invalid Credentials: No Account was found!!");
                    res.json({success:false , status:"Phone Verification Failed!!" , err:err.message});
                }else{
                    const generator = async function generateOTP(){
                        const otp = await sendOTP("Login" , req.body.phoneNo);
                        if(otp){
                            Otps.deleteOne({phoneNo:req.body.phoneNo} , (err , resp) => {
                                if(err){
                                    res.statusCode = 500;
                                    res.json({err:err})
                                }
                            })
                            Otps.create({
                                phoneNo:req.body.phoneNo,
                                otp: otp
                            } , (err , otpDoc) => {
                                if(err){
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type','application/json');
                                    res.json({success:false , status:"Bad Request" , err:err})
                                }else{
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type','application/json');
                                    res.json({success:true ,status:"Request Successfull" , msg:"OTP send to XXXXX " + req.body.phoneNo.substring(6,10)})  
                                }
                            })
                        }else{
                            res.statusCode = 500;
                            res.setHeader('Content-Type','application/json');
                            res.json({success:false , status:"OTP Registration Failed !!"})
                        }
                    }
                    generator()
                }
            }
        })
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        const err = new Error("Bad Credentials: Number is required !!")
        res.json({success:false , err:err.message}) 
    }
})

otpRouter.options('/login' , cors.cors , (req,res,next) => {res.sendStatus("200")});
otpRouter.post('/login' , cors.corsWithOpts , (req,res,next) => {
    if(req.body.otp){
        Otps.findOne({phoneNo:req.body.phoneNo} , (err,otpDoc) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , err:err})
            }else{
                if(!otpDoc){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"OTP Expired" , err:"OTP Validity Expired!!"})
                }else{
                    if(otpDoc.otp !== req.body.otp){
                        res.statusCode = 403;
                        res.setHeader('Content-Type','application/json');
                        const err = new Error("Bad Credentials: OTP Code is Invlaid!!")
                        res.json({success:false , status:"Invalid Credentials" , err:err.message})
                    }else if(otpDoc.otp === req.body.otp){
                        Otps.findByIdAndDelete(otpDoc._id , (err,resp) => {
                            if(err){
                                console.log(err)
                            }
                        })
                        Users.findOne({phoneNo:req.body.phoneNo} , (err,user) => {
                            if(err){
                                res.statusCode = 500;
                                res.setHeader('Content-Type','application/json');
                                res.json({success:false , status:"Bad Request" , err:err})
                            }else{
                                if(user){
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type','application/json');
                                    res.json({success:true , status:"Verified" , msg:"Number Verfied Successfully!!" , token:getJWT(user._id) , user:user})
                                }
                            }
                        })
                    }
                }
            }
        })
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        const err = new Error("Bad Credentials: OTP Code is required !!")
        res.json({success:false , status:"Empty Credentials" , err:err.message})
    }
})

otpRouter.options('/getOTP' , cors.cors , (req,res,next) => {res.sendStatus("200")});
otpRouter.post('/getOTP' , cors.corsWithOpts , (req,res,next) => {
    if(req.body.phoneNo){
        Users.findOne({phoneNo:req.body.phoneNo} , (err,user) =>{
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Bad Request" , err:err})
            }else{
                if(user){
                    res.statusCode = 403;
                    res.setHeader('Content-Type','application/json');
                    const err = new Error("This Phone Number is already being used!!")
                    res.json({success:false , status:"Phone Verification Failed!!" , err:err.message})
                }else if(!user){
                    const generator = async function generateOTP(){
                        const otp = await sendOTP("Registration" , req.body.phoneNo);
                        if(otp){
                            Otps.deleteOne({phoneNo:req.body.phoneNo} , (err , resp) => {
                                if(err){
                                    res.statusCode = 500;
                                    res.json({err:err})
                                }
                            })
                            Otps.create({
                                phoneNo:req.body.phoneNo,
                                otp: otp
                            } , (err , otpDoc) => {
                                if(err){
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type','application/json');
                                    res.json({success:false , status:"Bad Request" , err:err})
                                }else{
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type','application/json');
                                    res.json({success:true ,status:"Request Successfull" , msg:"OTP send to XXXXX " + req.body.phoneNo.substring(6,10)})  
                                }
                            })
                        }else{
                            res.statusCode = 500;
                            res.setHeader('Content-Type','application/json');
                            res.json({success:false , status:"Bad Request" , err:"OTP Registration Failed !!"})
                        }
                    }
                    generator()
                }
            }
        })
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        const err = new Error("Bad Credentials: Number is required !!")
        res.json({success:false , status:"Empty Credentials" , err:err.message})
    }
    
})

otpRouter.options('/register' , cors.cors , (req,res,next) => {res.sendStatus("200")});
otpRouter.post('/register' , cors.corsWithOpts , (req,res,next) => {
    if(req.body.otp){
        Otps.findOne({phoneNo:req.body.phoneNo} , (err,otpDoc) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , err:err})
            }else{
                if(!otpDoc){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"OTP Expired" , err:"OTP Validity Expired!! Resend Request for new code"})
                }else{
                    if(otpDoc.otp !== req.body.otp){
                        res.statusCode = 403;
                        res.setHeader('Content-Type','application/json');
                        const err = new Error("Bad Credentials: OTP Code is Invlaid!!")
                        res.json({success:false , status:"Invalid Credentials" , err:err.message})
                    }else if(otpDoc.otp === req.body.otp){
                        Otps.findByIdAndDelete(otpDoc._id , (err,resp) => {
                            if(err){
                                console.log(err)
                            }
                        })
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.json({success:true , status:"Verified" , msg:"Number Verfied Successfully!!"})
                    }
                }
            }
        })
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        const err = new Error("Bad Credentials: OTP Code is required !!")
        res.json({success:false , err:err.message})
    }
})

module.exports = otpRouter;