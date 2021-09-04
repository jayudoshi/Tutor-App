import React , { useEffect, useState } from 'react';

import Sidebar from './sidebar';

import StudentDashboard from './dashboard'
import StudentProfile from './profile';
import StudentInvites from './invites';
import StudentTutor from './tutor';
import StudentCourse from './courses';
import EnrollCourse from './enrollCourses';
import Pusher from 'pusher-js'


function Main(props){

    const [pusher , setPusher] = useState()
    const [channel , setChannel] = useState()

    useEffect(() =>{
        if(!pusher){
            const pusherInstance = new Pusher('879a5f4fbd24575da3d8', {
                cluster: 'ap2',
                encrypted: true,
            });
            const channel = pusherInstance.subscribe('Invites-' + props.user.credentials._id);
            setPusher(pusherInstance)
            setChannel(channel)
        }
    },[])
    
    const updateInvite = (resp) => {
        if(props.invites){
            if(resp.invite && !resp.course){
                let i = null;
                let Invite = null;
                props.invites.map( (invite , index) => {
                    if(invite._id + '' === resp.invite._id + ''){
                        i = index
                        Invite = invite
                    }
                    return 1
                })
                if(Invite && i){
                    Invite.status = resp.invite.status;
                    const Invites = props.invites;
                    Invites[i] = Invite
                    props.setInvites(Invites)
                }
                
            }
            else if(resp.invite && resp.course){
                let i = null;
                let Invite = null;
                props.invites.map( (invite , index) => {
                    if(invite._id + '' === resp.invite._id + ''){
                        i = index
                        Invite = invite
                    }
                    return 1
                })
                if(Invite && i){
                    Invite.status = resp.invite.status;
                    const Invites = props.invites;
                    Invites[i] = Invite
                    props.setInvites(Invites)
                    const Courses = [resp.course , ...props.courses]
                    props.setCourses(Courses)
                }
                
            }
        }
    }

    const pusherSetup = () => {
        if(pusher && channel){
            channel.unbind('updated')
            channel.bind('updated', updateInvite);
        }
    }

    return(
        <React.Fragment>
            {props.courses && props.invites && pusherSetup()}
            <Sidebar view={props.view} setView={props.setView} toggle={props.toggle} setToggle={props.setToggle} />            

            {props.view === "Dashboard" && <StudentDashboard logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle}
                courses={props.courses} invites={props.invites}
            />}

            {props.view === "Profile" && <StudentProfile logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle} user={props.user}
                updateUser={props.updateUser}
            />}

            {props.view === "Courses" && <StudentCourse logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle} setView={props.setView} 
                courses={props.courses} invites={props.invites}
            />}

            {props.view === "Enroll" && <EnrollCourse logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle} user={props.user}
                setInvites={props.setInvites} invites={props.invites}
            />}

            {props.view === "Tutors" && <StudentTutor logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle}
                courses={props.courses}
            />}

            {props.view === "Invites" && <StudentInvites logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle}
                invites={props.invites}
            />}

        </React.Fragment>
    )
}

export default Main