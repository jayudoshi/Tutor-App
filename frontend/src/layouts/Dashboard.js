import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import StudentApp from '../views/studentDashboard/app'
import TutorApp from '../views/tutorDashboard/app'

function DashBoard(props){

    const [id , setId] = useState(false)

    return(
        <div className="container-fluid h-100 p-0" style={{backgroundColor:"#E2E7EC"}}>
            {props.user && !props.user.isAuthenticated && <Redirect to="/signIn" />}
            {props.user && props.user.isAuthenticated && !props.user.credentials.profileSetup && <Redirect to="/profile" />}
            <div className="row w-100 h-100">
                {props.user.credentials && props.user.credentials.role === "Student" && <StudentApp user={props.user} logoutUser={props.logoutUser}
                    updateUser={props.updateUser} 
                    fetchCourses={props.fetchCourses} courses={props.courses}
                    id={id}
                />}
                {props.user.credentials && props.user.credentials.role === "Tutor" && <TutorApp 
                    user={props.user} logoutUser={props.logoutUser} updateUser={props.updateUser} 
                    id={id}
                />}
            </div>
        </div>
    )
}

export default DashBoard