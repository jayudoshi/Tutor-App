import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../config';

import Header from '../../components/Dashboard/Header/header';
import StudentList from '../../components/Dashboard/Student/studentList';
import Invites from '../../components/Dashboard/Invites/invites';
import DetialDisplay from '../../components/Dashboard/Course/detailDisplay';
import AcceptedDeclined from '../../components/Dashboard/Invites/accepted_declined'



function CourseDetail(props){

    const [invites , setInvites] = useState([])
    const [acceptedInvites , setAccepted] = useState([])
    const [declinedInvites , setDeclined] = useState([])
    const [students , setStudents] = useState([...props.course.students])
    useEffect(() => {
        fetch(baseUrl + "invites?courseId=" + props.course._id , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                setInvites(resp.invites);
                setAccepted(resp.invites.filter(invite => invite.status === "Accepted"))
                setDeclined(resp.invites.filter(invite => invite.status === "Declined"))
            }
        })
    } , [])

    function getPendingInvites(){
        if(invites){
            const pending = invites.filter(invite =>{
                let a;
                props.course.invites.map(Invite => {
                    if(Invite._id === invite._id){
                        a = true
                    }
                })
                if(a){
                    return a
                }else{
                    return false
                }
            })
            return pending;
        }
    }
    
    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view={props.course.name} toggle={props.toggle} setToggle={props.setToggle}/>
            <DetialDisplay course={props.course} setCourses={props.setCourses} setCourse={props.setCourse} 
                UpdateCourses={props.UpdateCourses}
            />
            <Invites invites={getPendingInvites()} courses={props.courses} setCourses={props.setCourses} setCourse={props.setCourse}
                accepted={acceptedInvites} setAccepted={setAccepted} declined={declinedInvites} setDeclined={setDeclined}
                setStudents={setStudents} setInvites={setInvites}
            />
            <StudentList students={students} courses={props.course}/>
            <AcceptedDeclined invites={acceptedInvites} type="Accepted"/>
            <AcceptedDeclined invites={declinedInvites} type="Declined"/>
        </div>
    )
}

export default CourseDetail;