const express = require('express');
const passport = require('passport');
const userRouter = express.Router();
const {getJWT, verifyToken, verifyUser} = require('../authenticate');
const cors = require('../cors');
const path = require('path');

const Users = require('../models/users');
const Tutors = require('../models/tutors');
const Students = require('../models/students');
const Tasks = require('../models/todolist')

userRouter.options('/all' , cors.cors , (req,res,next) => {res.sendStatus("200")});
userRouter.post('/all' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Users.find({'_id' : { $in: req.body }} , (err,users) => {
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request"})
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status:"Request Successfull" , users:users});
        }
    })
    .populate('studentProfile')
    .populate('tutorProfile')
})

userRouter.options('/' , cors.cors , (req,res,next) => {res.sendStatus("200")});
userRouter.get('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Users.find({} , (err,users) => {
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request"})
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status:"Request Successfull" , users:users});
        }
    })
    .populate('studentProfile')
    .populate('tutorProfile')
})

userRouter.put('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
  Users.findByIdAndUpdate(req.user._id , req.body , {new:true} , (err,user) => {
    if(err){
      console.log(err)
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({success:false , status:"Bad Request"})
    }else{
      if(!user){

      }else{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true , status:"User Updated" , msg:"User updated Successfully!!" , user:user});
      }
    }
  })
  .populate('tutorProfile')
  .populate('studentProfile')
})

userRouter.options('/login' , cors.cors , (req,res,next) => {res.sendStatus("200")});
userRouter.post('/login' , cors.corsWithOpts , (req,res,next) => {
    passport.authenticate('local' , {session:false} , (err , user ,info) => {
        if(err){
            console.log(err);
        }
        if(!user){
            res.statusCode = 401;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Login Failed !!" , err:info});
        }
        if(user){
            req.logIn(user , {session:false} , (err) => {
                if(err){
                    res.statusCode = 401;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Login Failed" , err:info})
                }else{
                  if(user.role === "Student"){
                    Users.findOne({_id:user._id} , (err,user) => {
                      res.setHeader('Content-Type','application/json');
                      res.statusCode = 200;
                      res.json({success:true , status: "Login Successfully !!" , msg:"User login Sucessfulyy" , token:getJWT(req.user._id) , user:user});
                    })
                    .populate('studentProfile')
                  }else if(user.role === "Tutor"){
                    Users.findOne({_id:user._id} , (err,user) => {
                      res.setHeader('Content-Type','application/json');
                      res.statusCode = 200;
                      res.json({success:true , status: "Login Successfully !!" , msg:"User login Sucessfulyy" , token:getJWT(req.user._id) , user:user});
                    })
                    .populate('tutorProfile')
                  }
                }
            })
        }
    })(req,res,next)
})

userRouter.options('/register' , cors.cors , (req,res,next) => {res.sendStatus("200")})
userRouter.post('/register' , cors.corsWithOpts , (req,res,next) => {
    Users.register({username: req.body.username} , req.body.password , (err,user) => {
        if(err){
            res.status(500).send({success: false , status: "Registration Unsuucessfull !!" , err: err})
        }else{
            if(req.body.fname){
                user.fname = req.body.fname
            }
            if(req.body.lname){
              user.lname = req.body.lname
            }
            if(req.body.phoneNo){
              user.phoneNo = req.body.phoneNo
            }
            if(req.body.role){
              user.role = req.body.role
            }
            user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.json({success: false , status: "Registration Unsuucessfull !!" , err: err});
                  return ;
                }
                Tasks.create({user: user._id,tasks: []})
                .then(() => {
                  passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                  });
                })
                
            })
        }
    })
})

userRouter.options('/updateProfile/tutor' , cors.cors , (req,res,next) => {res.sendStatus("200")});
userRouter.post('/updateProfile/tutor' , cors.corsWithOpts , verifyUser , (req,res,next) => {
  if(req.user.role === "Tutor"){
    Tutors.create(req.body , (err,tutor) => {
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false , status: "Request Unsuucessfull !!" , err: err});
      }else if(tutor){
        Users.findByIdAndUpdate(req.user._id, {profileSetup:true ,tutorProfile:tutor._id} , {new:true}, (err,user) => {
          if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Profile Setup Failed !!" , err:err})
          }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status:"Profile Setup Completed !!" , user:user})
          }
        }).populate('tutorProfile')
      }
    })
  }
})

userRouter.options('/updateProfile/student' , cors.cors , (req,res,next) => {res.sendStatus("200")});
userRouter.post('/updateProfile/student' , cors.corsWithOpts , verifyUser , (req,res,next) => {
  if(req.user.role === "Student"){
    Students.create(req.body , (err,student) => {
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false , status: "Request Unsuucessfull !!" , err: err});
      }else if(student){
        Users.findByIdAndUpdate(req.user._id, {profileSetup:true ,studentProfile:student._id} , {new:true}, (err,user) => {
          if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Profile Setup Failed !!" , err:err})
          }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status:"Profile Setup Completed !!" , user:user})
          }
        }).populate('studentProfile')
      }
    })
  }
})

userRouter.put('/updateProfile/tutor' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Tutors.findByIdAndUpdate(req.user.tutorProfile , req.body , {new:true} , (err , tutor) => {
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({success:false , status:"Failed to Update Profile!!" , err:err})
        }else{
          Users.findById(req.user._id , (err,user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status:"Profile Successfully Updated!!" , user:user})
          }).populate('tutorProfile')
        }
    })
})

userRouter.put('/updateProfile/student' , cors.corsWithOpts , verifyUser , (req,res,next) => {
  Students.findByIdAndUpdate(req.user.studentProfile , req.body , {new:true} , (err , student) => {
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"Failed to Update Profile!!" , err:err})
      }else{
        Users.findById(req.user._id , (err,user) => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({success:true , status:"Profile Successfully Updated!!" , user:user})
        }).populate('studentProfile')
      }
  })
})

module.exports = userRouter;