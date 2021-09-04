const express = require('express');
const Tasks = require('../models/todolist');
const {verifyUser} = require('../authenticate');
const cors = require('../cors');

const taskRouter = express.Router();

taskRouter.options('/' , cors.cors , (req,res,next) => {res.sendStatus("200")});
taskRouter.get('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Tasks.findOne({user: req.user._id} , (err,task) => {
        if(err){
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request!!" , err:err});
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({success:true , status:"Request Succesfull!!" , task:task})
        }
    })
    .populate('user')
})

taskRouter.post('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Tasks.findOne({user: req.user._id} , (err,task) => {
        if(err){
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request!!" , err:err});
        }else{
            if(task){
                res.statusCode = 403;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Bad Request!!" , err:err});
            }else{
                Tasks.create({user: req.body.user , tasks: []} , (err,task) => {
                    if(err){
                        res.statusCode = 403;
                        res.setHeader('Content-Type','application/json');
                        res.json({success:false , status:"Bad Request!!" , err:err});
                    }else{
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.json({success:true , status:"Request Succesfull!!" , task:task})
                    }
                })
            }
        }
    })
})

taskRouter.put('/' , cors.corsWithOpts , verifyUser , (req,res,next) => {
    Tasks.findOne({user: req.user._id} , (err,task) => {
        if(err){
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request!!" , err:err});
        }else{
            if(!task){
                res.statusCode = 404;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Tasks Not Found!!"});
            }
            task.tasks = [ {task:req.body.task} , ...task.tasks]
            task.save((err,updatedTask) => {
                if(err){
                    // console.log(err)
                    res.statusCode = 403;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Bad Request!!" , err:err});
                }else{
                    Tasks.findById(updatedTask._id , (err,task) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.json({success:true , status:"Request Successfull" , task:task})
                    })
                }
            })
        }
    })
})

taskRouter.options('/:taskId' , cors.cors , (req,res,next) => {res.sendStatus("200")});
taskRouter.put('/:taskId' , cors.corsWithOpts , verifyUser , (req,res,next) =>{
    Tasks.findOne({user: req.user._id} , (err,task) => {
        if(err){
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request!!" , err:err});
        }else{
            if(!task){
                res.statusCode = 404;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Tasks Not Found!!"});
            }
            if(req.body.status === true || req.body.status === false){
                task.tasks.id(req.params.taskId).status = req.body.status;
            }
            if(req.body.task){
                task.tasks.id(req.params.taskId).task = req.body.task;
            }
            task.save((err,task) => {
                if(err){
                    res.statusCode = 403;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Bad Request!!" , err:err});
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:true , status:"Request Successfull" , task:task})
                }
            })
        }
    })
})

taskRouter.delete('/:taskId' , cors.corsWithOpts , verifyUser , (req,res,next) =>{
    Tasks.findOne({user: req.user._id} , (err,task) => {
        if(err){
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({success:false , status:"Bad Request!!" , err:err});
        }else{
            if(!task){
                res.statusCode = 404;
                res.setHeader('Content-Type','application/json');
                res.json({success:false , status:"Tasks Not Found!!"});
            }
            task.tasks.id(req.params.taskId).remove();
            task.save((err,task) => {
                if(err){
                    res.statusCode = 403;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:false , status:"Bad Request!!" , err:err});
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:true , status:"Request Successfull" , task:task})
                }
            })
        }
    })
})

//     Tasks.findById(req.params.tasksId , (err,task) => {
//         if(err){
//             res.statusCode = 403;
//             res.setHeader('Content-Type','application/json');
//             res.json({success:false , status:"Bad Request!!" , err:err});
//         }else{
//             if(!task){
//                 res.statusCode = 404;
//                 res.setHeader('Content-Type','application/json');
//                 res.json({success:false , status:"Tasks Not Found!!"});
//             }
//             task.tasks.id(req.params.taskId).remove();
//             task.save((err,task) => {
//                 if(err){
//                     res.statusCode = 403;
//                     res.setHeader('Content-Type','application/json');
//                     res.json({success:false , status:"Bad Request!!" , err:err});
//                 }else{
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type','application/json');
//                     res.json({success:true , status:"Request Successfull" , task:task})
//                 }
//             })
//         }
//     })
// })

module.exports = taskRouter