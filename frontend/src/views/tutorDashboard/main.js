import React , { useState } from 'react';

import Sidebar from './sidebar';

import TutorDashboard from './dashboard';
import TutorProfile from './profile';
import TutorCourse from './course';
import TutorCourseDetail from './courseDetails';
import TutorStudent from './student';
import TutorInvites from './invites';

import Pusher from 'pusher-js';

function Main(props){

    
    const [pusher , setPusher] = useState()

    const addInvite = (resp) => {
        if(props.courses){
            let i = null;
            let Course = null
            props.courses.map( (course,index) => {
                if(course._id === resp.invite.course){
                    i = index
                    Course =  course
                }
            })
            if( i && Course){
                const arr = Course.invites.filter(invite => invite._id === resp.invite._id);
                if(arr.length === 0 ){
                    Course.invites = [resp.invite , ...Course.invites]
                    const Courses = props.courses;
                    Courses[i] = Course;
                    props.setCourses(Courses)
                    if(Course._id === props.course._id){
                        props.setCourse(Course)
                    }
                }
            }
        }
    }

    const pusherSetup = () => {
        if(!pusher){
            const pusherInstance = new Pusher('879a5f4fbd24575da3d8', {
                cluster: 'ap2',
                encrypted: true,
            });
            setPusher(pusherInstance)
            const channel = pusherInstance.subscribe('Invites-' + props.user.credentials._id);
            channel.bind('inserted', addInvite);
        }
    }

    return (
        <React.Fragment>
            {props.courses && pusherSetup()}
            <Sidebar view={props.view} setView={props.setView} toggle={props.toggle} setToggle={props.setToggle} />
            
            {props.view === "Dashboard" &&  <TutorDashboard logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle}
                courses={props.courses}
            />}

            {props.view === "Profile" && <TutorProfile logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle}
                user={props.user} updateUser={props.updateUser}
            />}

            {props.view === "Courses" && <TutorCourse 
                setView={props.setView}    logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle}user={props.user} 
                courses={props.courses} setCourses={props.setCourses} setCourse={props.setCourse}
            />}
            
            {props.view === "CourseDetail" && <TutorCourseDetail logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle} course={props.course}
                courses={props.courses} setCourses={props.setCourses} setCourse={props.setCourse}
            />}

            {props.view === "Students" && <TutorStudent logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle} courses={props.courses}
            />}

            {props.view === "Invites" && <TutorInvites logoutUser={props.logoutUser} 
                toggle={props.toggle} setToggle={props.setToggle}
                courses={props.courses} setCourses={props.setCourses} course={props.course} setCourse={props.setCourse}
            />}

        </React.Fragment>
    )
}

export default Main;