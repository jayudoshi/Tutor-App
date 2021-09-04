const express = require('express');
const {verifyUser} = require('../authenticate');
const cors = require('../cors');

const Invites = require('../models/invites');
const Courses = require('../models/courses')

const invitesRouter = express.Router();

invitesRouter.options('/' , cors.cors , (req,res,next) => {res.sendStatus("200")});
invitesRouter.get('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    if(req.user.role === "Student" && !req.query.courseId){
        Invites.find({from:req.user._id} , (err,invites) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Course Not Found!!"});
            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({success: true , invites:invites});
            }
        })
        .sort({"_id":-1})
        .populate('from')
        .populate('course')
        .populate({
            path:'course',
            populate:{
                path: 'tutor'
            }
        })
    }else{
        if(req.query.courseId){
            Invites.find({course:req.query.courseId} , (err,invites) => {
                if(err){
                    console.log(err)
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Course Not Found!!"});
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success: true , invites:invites});
                }
            })
            .populate('from')
            .populate({
                path : 'from',
                populate : {
                  path : 'studentProfile'
                }
              })
            .sort({"_id":-1})
        }else{
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"You are not authorized to perform action!!"});  
        }
    }
});

invitesRouter.post('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    if(req.user.role === "Student"){
        if(req.user._id + "" !== req.body.from){
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Invite Not Sent!!"});
            return ;
        }else{
            Courses.findById(req.body.course , (err , course) => {
                if(err){
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Invite Not Sent!!"});
                    return ;
                }else{
                    if(!course){
                        res.statusCode = 404;
                        res.setHeader('Content-Type','application/json');
                        res.json({success:false , status:"Course Not Found!!"});
                        return ;
                    }else if(course){
                        if(course.students.includes(req.user._id)){
                            res.statusCode = 403;
                            res.setHeader('Content-Type','application/json');
                            res.json({success:false , status:"You are already Student!!"});
                            return ;
                        }
                        if(course.invites.filter(invite => invite.from + "" === req.user._id + "").length === 0){
                            Invites.create(req.body , (err,invite) => {
                                if(err){
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type','application/json');
                                    res.json({success:false , status:"Invite Not Sent!!"});
                                    return ;
                                }else{
                                    Courses.findById(invite.course , (err, course) => {
                                        if(err){
                                            Invites.findByIdAndDelete(invite._id , (err , resp) => {
                                                res.statusCode = 500;
                                                res.setHeader('Content-Type','application/json');
                                                res.json({success:false , status:"Invite Not Sent!!"});
                                                return ;
                                            })
                                        }else{
                                            course.invites = [...course.invites , invite._id];
                                            course.save((err,course => {
                                                if(err){
                                                    Invites.findByIdAndDelete(invite._id , (err , resp) => {
                                                        res.statusCode = 500;
                                                        res.setHeader('Content-Type','application/json');
                                                        res.json({success:false , status:"Invite Not Sent!!"});
                                                        return ;
                                                    })      
                                                }else{
                                                    Invites.findById(invite._id , (err , invite) => {
                                                        res.statusCode = 200;
                                                        res.setHeader('Content-Type','application/json');
                                                        res.json({success:true , status:"Invite Sent!!" , invite:invite});
                                                        return ;
                                                    })
                                                    .populate('from')
                                                    .populate('course')
                                                    .populate({
                                                        path:'course',
                                                        populate:{
                                                            path: 'tutor'
                                                        }
                                                    })
                                                }
                                            }))
                                        }
                                    })
                                }
                            })
                        }else{
                            res.statusCode = 403;
                            res.setHeader('Content-Type','application/json');
                            res.json({success:false , status:"Invite Already Sent!!"});
                            return ;
                        }
                    }
                }
            }).populate('invites')
        }
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"You are not authorized to perform action!!"});
    }
});

invitesRouter.delete('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    if(req.user.role === "Student"){
        Invites.deleteMany({from:req.user._id} , (err,resp) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Failed to Delete Invites!!"});
            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({success:true , status:"Invite Deleted!!" , resp:resp});
            }
        })
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"You are not authorized to perform action!!"});
    }
})

invitesRouter.options('/:inviteId' , cors.cors , (req,res,next) => {res.sendStatus("200")});
invitesRouter.get('/:inviteId' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    if(req.user.role === "Student"){
        Invites.findOne({_id:req.params.inviteId , from:req.user._id} , (err,invite) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Course Not Found!!"});
            }else{
                if(!invite){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Invite Not Found!!"});
                }else if(invite){
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success: true , invite:invite});
                }
            }
        })
        .populate('from')
        .populate('course')
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"You are not authorized to perform action!!"});
    }
});

invitesRouter.put('/all' , cors.corsWithOpts , verifyUser , (req,res,next) =>{
    if(req.user.role === "Tutor"){
        Invites.find({_id:{$in:req.body.invites}} , (err,invites) => {
            invites = invites.filter(invite => invite.course.tutor + "" === req.user._id + "" && invite.status !== 'Accepted');
            if(invites.length > 0){
                Invites.updateMany({_id:{$in:invites}} , {status:req.body.status} , (err,Invites) => {
                    if(err){
                        res.statusCode = 500;
                        res.setHeader('Content-Type','application/json');
                        res.json({success:false , status:"Failed to Update!!"});
                    }else{
                        let from = [];
                        invites.map(invite => from.push(invite.from))
                        const _id = invites.map(invite => invite._id)
                        const courseId = invites[0].course._id
                        Courses.findById(courseId , (err , course) => {
                            if(req.body.status === "Accepted"){
                                course.students = [...course.students , ...from]
                            }
                            course.invites = course.invites.filter(Invite => _id.includes(Invite))
                            course.save((err,course) => {
                                Courses.findById(course._id , (err , Course) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type','application/json');
                                    res.json({success:true , status:"Successfully Updated!!",course:Course});
                                })
                                .populate('invites')
                                .populate('students')
                                .populate({
                                    path : 'students',
                                    populate : {
                                      path : 'studentProfile'
                                    }
                                })
                            })
                        })
                    }
                })
            }else{
                res.statusCode = 403;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"You are not authorized to perform action!!"});
            }
        })
        .populate('course')
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"You are not authorized to perform action!!"});
    }
})

invitesRouter.put('/:inviteId' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    if(req.user.role === "Tutor"){
        Invites.findById(req.params.inviteId , (err,invite) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Failed to Update!!"});
            }else{
                if(!invite){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Failed to Update!!"});
                }else{
                    if(invite.course.tutor + "" === req.user._id + ""){
                        Invites.findByIdAndUpdate(req.params.inviteId , req.body , {new:true} , (err,invite) => {
                            if(err){
                                res.statusCode = 500;
                                res.setHeader('Content-Type','application/json');
                                res.json({success:false , status:"Failed to Update!!"});
                            }else{
                                Courses.findById(invite.course._id , (err,course) => {
                                    if(invite.status === "Accepted"){
                                        course.students = [...course.students , invite.from._id]
                                    }
                                    course.invites = course.invites.filter(Invite => {
                                        return Invite._id + "" !== invite._id + ""
                                    })
                                    // course.invites = course.invites.filter(Invite => Invite + "" !== invite._id + "");
                                    
                                    course.save((err,Course) => {
                                        Invites.findById(invite._id , (err,_invite) => {
                                            Courses.findById(Course._id , (err,COURSE) => {
                                                res.statusCode = 200;
                                                res.setHeader('Content-Type','application/json');
                                                res.json({success:true , status:"Successfully Updated!!" , invite:_invite , course:COURSE});
                                            })
                                            .populate('invites')
                                            .populate('students')
                                            .populate({
                                                path : 'students',
                                                populate : {
                                                  path : 'studentProfile'
                                                }
                                            })
                                        })
                                        .populate('from')
                                        .populate('course')
                                    })
                                })
                                .populate('invites')
                            }
                        })
                        .populate('course')
                    }else{
                        res.statusCode = 403;
                        res.setHeader('Content-Type','application/json');
                        res.json({success:false , status:"You are not authorized to perform action!!"});
                    }
                }
            }
        })
        .populate('course')
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"You are not authorized to perform action!!"});
    }
});

invitesRouter.delete('/:inviteId' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    if(req.user.role === "Student"){
        Invites.deleteOne({from:req.user._id} , (err,resp) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Failed to Delete Invites!!"});
            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({success:true , status:"Invited Delted!!" , resp:resp});
            }
        })
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"You are not authorized to perform action!!"});
    }
})

module.exports = invitesRouter