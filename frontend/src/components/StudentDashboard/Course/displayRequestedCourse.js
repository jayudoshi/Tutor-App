import React from 'react';

import { Card, CardBody, Col, Row } from 'reactstrap';

import TeacherIcon from '../../../assests/img/teacher-icon.png'
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloudIcon from '@material-ui/icons/Cloud';
import Difficulty from '../../../assests/img/bar-chart.png';

function RequestedCourse(props){

    function renderContact(invites){
        return invites.map(invite => {
            const course = invite.course
            return (
            <Row className="mb-4">
                <Col>
                    <Card className="dashview">
                        <CardBody>
                            <Row>
                                <Col sm="12" xl="2" lg="3" className="text-center img-avatar m-auto">
                                        <img src={course.image} alt="Avatar" className="avatar" />
                                    </Col>
                                <Col sm="12" xl="8" lg="9" className="border-right">
                                    <h3 className="text-left" style={{color:"#2a2a2a"}}>{course.name}</h3>
                                    <h5>
                                        <span class="pill">{course.grade}</span>
                                        <span class="pill" style={{marginLeft:"2%"}}>{course.board}</span>
                                        <span class="pill" style={{marginLeft:"2%"}}>{course.subject}</span>
                                        <span class="pill" style={{marginLeft:"2%"}}>{course.language}</span>
                                    </h5>
                                    <p>{course.about}</p>
                                </Col>
                                <hr className="horizontal-line"></hr>
                                <Col sm="12" xl="2" lg="12" className="p-0 m-auto">
                                    <div className="padding-left w-100">
                                        <div className="info-item" >
                                            <p className=""><img src={TeacherIcon} alt="Teacher Logo" className="m-0" style={{display:"inline" , marginRight:"5px" , width:"24px"}}/>{course.tutor.fname + " " + course.tutor.lname}</p>
                                        </div>
                                        <div className=" info-item">
                                            <p className=""><ScheduleIcon style={{display:"inline" , marginRight:"5px" , opacity:"0.5"}}/>{course.timings}</p>
                                        </div>    
                                        <div className=" info-item">
                                            <p className=""><CloudIcon style={{display:"inline" , marginRight:"5px" , opacity:"0.5"}}/>{course.mode}</p>
                                        </div>
                                        <div className="info-item" >
                                            <p className=""><img src={Difficulty} alt="Level Logo" className="m-0" style={{display:"inline" , marginRight:"5px" , width:"20px"}}/><span style={{marginLeft:"10px"}}>{course.level}</span></p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )})
    }

    return (
        <React.Fragment>
            {renderContact(props.invites)}
        </React.Fragment>
    )
}

export default RequestedCourse;