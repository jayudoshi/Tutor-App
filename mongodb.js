var mongoose = require("mongoose");
var Pusher = require("pusher");
const Courses = require("./models/courses");
var Invites = require('./models/invites');

const pusher = new Pusher({
  appId: process.env.PUSHER_API_ID,
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true,
});

const channel = "ChangeStreams";

var DB_URL = process.env.MONGODB_URL;
mongoose.connect( DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected To Database !!");

        mongoose.connection.createCollection('invites' , (error,collection) => {})
        mongoose.connection.createCollection('courses' , (error,collection) => {})
        const invites = mongoose.connection.collection('invites').watch([],{fullDocument:"updateLookup"});
        invites.on("change" , change => {
            if(change.operationType === 'insert'){
                Invites.findById(change.fullDocument._id , (err,invite) => {
                    if(err){
                        console.log(err)
                    }else{
                        const tutorId = invite.course.tutor;
                        invite.course = invite.course._id
                        pusher.trigger(
                            'Invites-' + tutorId,
                            'inserted', 
                            {
                              invite: invite,
                            }
                        );
                    }
                })
                .populate('course')
            }else if(change.operationType === 'update'){
                const Invite = change.fullDocument;
                if(Invite.status === 'Declined'){
                    const from = Invite.from
                    Invites.findById(Invite._id , (err,invite) => {
                        if(err){
                            console.log(err)
                        }else{
                            pusher.trigger(
                                'Invites-' + from,
                                'updated', 
                                {
                                  invite: invite,
                                }
                            );
                        }
                    })
                }else if(Invite.status === 'Accepted'){
                    const from = Invite.from
                    const course = Invite.course
                    Invites.findById(Invite._id , (err,invite) => {
                        if(err){
                            console.log(err)
                        }else{
                            Courses.findById(course , (err,course) => {
                                if(err){
                                    console.log(err)
                                }else{
                                    pusher.trigger(
                                        'Invites-' + from,
                                        'updated', 
                                        {
                                          invite: invite,
                                          course: course
                                        }
                                    );
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
                        }
                    })
                }
            }
        })
    }
});