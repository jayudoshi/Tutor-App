import React from 'react';

import { Card, Col, Row } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import Header from '../../components/Dashboard/Header/header';

import RequestedCourse from '../../components/StudentDashboard/Course/displayRequestedCourse';

function CourseView(props){


    function handleClick(){
        props.setView("Enroll")
    }

    function getPendingRequests(){
        let pending = []
        if(props.invites){
            pending = props.invites.filter(invite => {
                return invite.status === "Pending"
            })
        }
        return pending
    }

    function renderRequested(){
        if(props.invites){
            const invites = getPendingRequests()
            return (
                <React.Fragment>
                    {invites && invites.length > 0 &&
                        <React.Fragment>
                            <Row className="mb-4">
                                <h3 className="text-center" style={{color:"#9A9A9A"}}>
                                    Requested Courses
                                </h3>
                            </Row>
                            <RequestedCourse invites={invites}/>
                        </React.Fragment>
                    }
                </React.Fragment>       
            )
        }
    }

    function getAcceptedRequests(){
        let pending = []
        if(props.invites){
            pending = props.invites.filter(invite => {
                return invite.status === "Accepted"
            })
        }
        return pending
    }

    function renderAccepted(){
        if(props.invites){
            const invites = getAcceptedRequests()
            return (
                <React.Fragment>
                    {invites && invites.length > 0 &&
                        <React.Fragment>
                            <Row className="mb-4">
                                <h3 className="text-center" style={{color:"#9A9A9A"}}>
                                    Your Courses
                                </h3>
                            </Row>
                            <RequestedCourse invites={invites}/>
                        </React.Fragment>
                    }
                </React.Fragment>       
            )
        }
    }

    return (
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view="Courses" toggle={props.toggle} setToggle={props.setToggle}/>
            <Row className="mb-4">
                <Col>
                    <Card className="p-3">
                        <div className="dashview p-2 w-80 m-auto text-center">
                            <button onClick={handleClick} className="btn btn-lg btn-outline-secondary m-auto" style={{width:"330px"}}><AddIcon style={{display:"inline",marginRight:"5px"}} />Enroll For New Courses</button>
                        </div>
                    </Card>
                </Col>
            </Row>
            {renderRequested()}
            {renderAccepted()}          
        </div>
    )
}

export default CourseView;