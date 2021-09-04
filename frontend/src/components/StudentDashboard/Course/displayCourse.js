import React, { useState } from 'react'

import { Card, CardBody, Col, Row } from 'reactstrap';

import TeacherIcon from '../../../assests/img/teacher-icon.png';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloudIcon from '@material-ui/icons/Cloud';
import { baseUrl } from '../../../config';
import Difficulty from '../../../assests/img/bar-chart.png';

function DisplayCourse(props){

    const [enrolled , setEnrolled] = useState([]);
    const [invites , setInvites] = useState(props.invites);

    function handleClick(course){
        fetch(baseUrl + "/invites" , {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
                from: props.user.credentials._id,
                course: course._id
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                props.setInvites(prevState => [resp.invite , ...prevState])
                setEnrolled((prevState) => [resp.invite.course._id , ...prevState])
            }
        })
    }

    function isEnrolled(id,Invites){
        let present = false
        if(Invites){
            if(Invites.length !== 0){
                Invites.map( (invite) => {
                    if(invite.course){
                        if(invite.course._id === id){
                            present = true
                        }
                    }
                })
                
            }
        }
        return present
    }

    function renderCourse(courses){
        if(courses){
            return courses.map(course => (
                <Row className="mb-4" key={course._id}>
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
                                            <span class="pill" style={{marginLeft:"2%"}}>{course.language === "Both" ? "English & Hindi" : course.language}</span>
                                        </h5>
                                        <p>{course.about}</p>
                                    </Col>
                                    <hr className="horizontal-line"></hr>
                                    <Col sm="12" xl="2" lg="12" className="p-0">
                                        <div className="padding-left w-100 m-auto">
                                            <div className="info-item" >
                                                <p className=""><img src={TeacherIcon} alt="Teacher Logo" className="m-0" style={{display:"inline" , marginRight:"5px" , width:"24px"}}/> {course.tutor.fname + " " + course.tutor.lname}</p>
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
                                            {enrolled.includes(course._id) || isEnrolled(course._id , invites) ?  
                                                <div className="info-item-btn">
                                                    <button className="btn btn-lg btn-block btn-outline-secondary view-details" 
                                                    style={{display:"block" , width:"100%"}}
                                                    disabled={true}
                                                    >
                                                        Enrolled!
                                                    </button>
                                                </div>
                                            :
                                                <div className="info-item-btn">
                                                    <button className="btn btn-lg btn-block btn-outline-secondary view-details" 
                                                    style={{display:"block" , width:"100%"}}
                                                    onClick={() => handleClick(course)}
                                                    >
                                                        Enroll
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            ))  
        }
    }

    return(
        <React.Fragment>
            {props.courses && renderCourse(props.courses)}
        </React.Fragment>
    )
}

export default DisplayCourse;