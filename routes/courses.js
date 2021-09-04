const express = require('express');
const {verifyUser} = require('../authenticate');
const cors = require('../cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const Courses = require('../models/courses');
const { bucket } = require('../firebase');

const upload = multer({
    storage: multer.memoryStorage(),
})

const coursesRouter = express.Router();

coursesRouter.options('/' , cors.cors , (req,res,next) => {res.sendStatus("200")});
coursesRouter.get('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    let query
    if(req.user.role === "Tutor"){
        query = { tutor: req.user._id }
    }else{
        query = { students: req.user._id }
    }
    Courses.find(query , (err,courses) => {
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request" , err:err})
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success: true ,status: "Course Found!!" , courses:courses});
        }
    })
    .populate('invites')
    .populate({
        path : 'students',
        populate : {
          path : 'studentProfile'
        }
    })
    .populate({
        path : 'tutor',
        populate : {
          path : 'tutorProfile'
        }
    })
    .sort({"_id":-1})
})

coursesRouter.post('/' , cors.corsWithOpts , verifyUser , upload.single('file') , (req,res,next) => {
    if(req.user.role !== "Tutor"){
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json');
        res.json({success:false , status:"Bad Request"});
        return
    }else{
        if(!req.file){
            req.fileName = 'sidebar.jpg';
            req.fileUrl = 'https://firebasestorage.googleapis.com/v0/b/tutorapp-74907.appspot.com/o/sidebar.jpg?alt=media&token=243270cb-9e83-4d82-bb78-09f4e961304f'
            next()
        }else{
            const extname =  path.extname(req.file.originalname).toLowerCase();
            const fileName = uuidv4() + extname;
            const destination = `tutors/${req.user._id}/${fileName}`
            const uuid = uuidv4();
    
            const blob = bucket.file(destination).createWriteStream({
                metadata:{
                    contentType: req.file.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            })
        
            blob.on('error', (error) => {
                res.statusCode = 403;
                res.setHeader('Content-Type','application/json');
                res.send({success:false , status:"Upload Failed" , error:error.message});
                return
            });
          
            blob.on('finish', async() => {
                const url = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(destination) + "?alt=media&token=" + uuid
                req.fileName = fileName;
                req.fileUrl = url;
                next()
            });
        
            blob.end(req.file.buffer);
        }
    }
} , (req,res) => {
    req.body.image = req.fileUrl;
    
    let doc = {
        name:req.body.name,
        grade:req.body.grade,
        board:req.body.board,
        subject:req.body.subject,
        language:req.body.language,
        timings:req.body.timings,
        mode:req.body.mode,
        fees:req.body.fees,
        about:req.body.about,
        tutor:req.body.tutor,
        invites:[],
        students:[],
        level:req.body.level,
        image:req.body.image,
    };
    Courses.create(doc , (err , course) => {
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request"});
            return
        }else{
            Courses.findById(course._id , (err,Course) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({success: true ,status: "Course Created!!" , course:Course});
            })
            .populate('students')
            .populate({
                path : 'students',
                populate : {
                  path : 'studentProfile'
                }
            })
        }
    })
})

coursesRouter.options('/getCourses' , cors.cors , (req,res,next) => {res.sendStatus("200")});
coursesRouter.get('/getCourses' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    let query = { students: {$nin:[req.user._id]} }
    Courses.find(query , (err,courses) => {
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request" , err:err})
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success: true ,status: "Course Found!!" , courses:courses});
        }
    })
    .populate('tutor')
    .sort({"_id":-1})
})

coursesRouter.options('/:courseId' , cors.cors , (req,res,next) => {res.sendStatus("200")});
coursesRouter.get('/:courseId' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Courses.findById(req.params.courseId , (err,course) => {
        if(err){
            res.statusCode = 404;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Course Not Found!!"});
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success: true , course:course});
        }
    })
    .populate('students')
    .populate('invites')
    .sort()
})

coursesRouter.put('/:courseId' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Courses.findByIdAndUpdate(req.params.courseId , req.body, {new:true} , (err,course) => {
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Course Not Found!!"});
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status: "Course Updated!!" , course:course});
        }
    })
})

coursesRouter.delete('/:courseId' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Courses.findByIdAndDelete(req.params.courseId , (err,resp) => {
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Course Not Found!!"});
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status: "Course Updated!!" , resp:resp});
        }
    })
})

module.exports = coursesRouter;