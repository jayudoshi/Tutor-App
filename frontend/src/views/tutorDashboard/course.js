import React from 'react';

import { Row } from 'reactstrap';
import CreateCourse from '../../components/Dashboard/Course/createCourse';
import Header from '../../components/Dashboard/Header/header';

import DisplayCourses from '../../components/Dashboard/Course/displayCourses';

function CourseView(props){
    return (
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view="Courses" toggle={props.toggle} setToggle={props.setToggle}/>
            <Row className="mt-4 mb-4">
                <CreateCourse user={props.user} setCourses={props.setCourses}/>
            </Row>
            <Row>
                <hr></hr>
                <h3 className="text-center" style={{color:"#9A9A9A"}}>Your Courses</h3>
            </Row>
            <DisplayCourses courses={props.courses} setView={props.setView} setCourse={props.setCourse}/>
        </div>
    )
}

export default CourseView;