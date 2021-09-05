import React, { useEffect, useState } from "react";
import DisplayCourse from "../../components/StudentDashboard/Course/displayCourse";

import Header from "../../components/Dashboard/Header/header";
import { baseUrl } from "../../config";

function EnrollCourses(props){

    const [courses , setCourses] = useState(null);

    useEffect(() => {
        if(!courses){
            fetch(baseUrl + "courses/getCourses" , {
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
            })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.err){
                    console.log(resp.err)
                }else{
                    setCourses(resp.courses)
                }
            })
        }
    } , [])

    return (
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view="Enroll" toggle={props.toggle} setToggle={props.setToggle}/>
            <DisplayCourse courses={courses} user={props.user} setInvites={props.setInvites} invites={props.invites}/>
        </div>
    )
}

export default EnrollCourses;