import React from 'react';

import { Card, CardBody, Col, Row } from 'reactstrap';

import SchoolIcon from '@material-ui/icons/School';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Difficulty from '../../../assests/img/bar-chart.png';

function DisplayCourses(props){

    function handleClick(course){
        props.setView('CourseDetail');
        props.setCourse(course)
    }

    function renderCourse(courses){
        return (
            courses.map(course => (
                <Row key={course._id} className="mb-4">
                    <Col>
                        <Card className="dashview">
                            <CardBody>
                                <Row>
                                    <Col sm="12" xl="2" lg="3" className="text-center img-avatar m-auto">
                                        <img src={course.image} alt="Avatar" className="avatar" />
                                    </Col>
                                    <Col sm="12" xl="8" lg="9" className="border-right">
                                        <h3 style={{color:"#2a2a2a"}}>{course.name}</h3>
                                        <h5>
                                            <span class="pill">{course.grade}</span>
                                            <span class="pill" style={{marginLeft:"2%"}}>{course.board}</span>
                                            <span class="pill" style={{marginLeft:"2%"}}>{course.subject}</span>
                                            <span class="pill" style={{marginLeft:"2%"}}>{course.language}</span>
                                        </h5>
                                        <p>                                        
                                            {course.about}
                                        </p>
                                    </Col>
                                    <hr className="horizontal-line"></hr>
                                    <Col sm="12" xl="2" lg="12" className="p-0">
                                        <div className="padding-left w-100 m-auto">
                                            <div className="info-item" >
                                                <p className=""><SchoolIcon style={{display:"inline" , marginRight:"5px" , opacity:"0.5"}}/>{course.students ? course.students.length : 0}</p>
                                            </div>
                                            <div className=" info-item">
                                                <p className=""><NotificationsActiveIcon style={{display:"inline" , marginRight:"5px" , opacity:"0.5"}}/>{course.invites ? course.invites.length : 0}</p>
                                            </div>    
                                            <div className=" info-item">
                                                <p className=""><AttachMoneyIcon style={{display:"inline" , marginRight:"5px" , opacity:"0.5"}}/>{course.fees}/month</p>
                                            </div>
                                            {/* <div className=" info-item">
                                                <p className="w-100" >
                                                    <StarIcon style={{display:"inline" , marginRight:"1px" , opacity:"0.5"}}/>
                                                    <StarIcon style={{display:"inline" , marginRight:"1px" , opacity:"0.5"}}/>
                                                    <StarIcon style={{display:"inline" , marginRight:"1px" , opacity:"0.5"}}/>
                                                    <StarIcon style={{display:"inline" , marginRight:"1px" , opacity:"0.5"}}/>
                                                    <StarIcon style={{display:"inline" , marginRight:"1px" , opacity:"0.5"}}/>
                                                    <div className="rating-count" >(125)</div>
                                                </p>
                                            </div> */}
                                            <div className="info-item" >
                                                <p className=""><img src={Difficulty} alt="Level Logo" className="m-0" style={{display:"inline" , marginRight:"5px" , width:"20px"}}/><span style={{marginLeft:"10px"}}>{course.level}</span></p>
                                            </div>
                                            <div className="info-item-btn">
                                                <button onClick={() => handleClick(course)} className="btn btn-lg btn-block btn-outline-secondary view-details" style={{display:"block" , width:"100%"}}>View Details</button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            ))
        )
    }

    return(
        <React.Fragment>
            {props.courses && renderCourse(props.courses)}
        </React.Fragment>
    )
}

export default DisplayCourses;