import React from 'react'
import { Card, CardBody, CardFooter, CardTitle, Row, Col, } from "reactstrap";
import CachedIcon from '@material-ui/icons/Cached';
import CourseLogo from '../../../assests/img/courses.png';
import TotalTutorLogo from '../../../assests/img/teacher.png';
import InvitesLogo from '../../../assests/img/game.png';
import TasksLogo from '../../../assests/img/task.png';

function Stats(props){

    function getTotalInvites(){
      let invites = 0;
      if(props.invites){
        props.invites.map(invite => {
          if(invite.status === "Pending")
          invites = invites + 1
        })
      }
      return invites
    }

    function getTutors(){
      const tutors = []
      if(props.courses){
          props.courses.map(course => {
              let tutor = course.tutor;
              if(tutors.filter(Tutor => Tutor._id === tutor._id).length === 0){
                  tutors.push(tutor)
              }
          })
      }
      return tutors.length
    }

    return(
        <Row>
            <Col lg="3" md="6" sm="6" className="mt-3 mb-3">
                <Card className="dashview m-auto">
                    <CardBody className="dashview-body">
                        <Row>
                            <Col md="4" xs="5">
                                <div className="w-100 h-100">
                                    <img src={CourseLogo} alt="Course-Logo" width="100%"/>
                                </div>
                            </Col>
                            <Col md="8" xs="7">
                                <div className="number">
                                    <p className="p-0 m-0 card-category">Courses</p>
                                        {props.courses && <CardTitle tag="p" className="m-0">{props.courses.length}</CardTitle>}
                                    <p />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="dashview-footer">
                        <hr className=""/>
                        <div className="footer-text">
                            <CachedIcon style={{display:"inline-block"}}/> Update Now
                        </div>
                    </CardFooter>
                </Card>
            </Col>
            <Col lg="3" md="6" sm="6" className="mt-3 mb-3">
                <Card className="dashview m-auto">
                    <CardBody className="dashview-body">
                        <Row>
                            <Col md="4" xs="5">
                                <div className="">
                                    <img src={TotalTutorLogo} alt="Total-Students-Logo" width="100%" />
                                </div>
                            </Col>
                            <Col md="8" xs="7">
                                <div className="number">
                                    <p className="p-0 m-0 card-category">Tutors</p>
                                        <CardTitle tag="p" className="m-0">{getTutors()}</CardTitle>
                                    <p />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="dashview-footer">
                        <hr className=""/>
                        <div className="footer-text">
                            <CachedIcon style={{display:"inline-block"}}/> Update Now
                        </div>
                    </CardFooter>
                </Card>
            </Col>
            <Col lg="3" md="6" sm="6" className="mt-3 mb-3">
                <Card className="dashview m-auto">
                    <CardBody className="dashview-body">
                        <Row>
                            <Col md="4" xs="5">
                                <div className="">
                                    <img src={InvitesLogo} alt="Invites-Logo" width="100%" />
                                </div>
                            </Col>
                            <Col md="8" xs="7">
                                <div className="number">
                                    <p className="p-0 m-0 card-category">Invites Pending</p>
                                      <CardTitle tag="p" className="m-0">{getTotalInvites()}</CardTitle>
                                    <p/>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="dashview-footer">
                        <hr className=""/>
                        <div className="footer-text">
                            <CachedIcon style={{display:"inline-block"}}/> Update Now
                        </div>
                    </CardFooter>
                </Card>
            </Col>
            <Col lg="3" md="6" sm="6" className="mt-3 mb-3">
                <Card className="dashview m-auto">
                    <CardBody className="dashview-body">
                        <Row>
                            <Col md="4" xs="5">
                                <div className="">
                                    <img src={TasksLogo} alt="Revenue-Logo" width="100%" />
                                </div>
                            </Col>
                            <Col md="8" xs="7">
                                <div className="number">
                                    <p className="p-0 m-0 card-category">Tasks Remaining</p>
                                        <CardTitle tag="p" className="m-0">{props.taskNumber}</CardTitle>
                                    <p />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="dashview-footer">
                        <hr className=""/>
                        <div className="footer-text">
                            <CachedIcon style={{display:"inline-block"}}/> Update Now
                        </div>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    )
}

export default Stats