import React from 'react'
import { Card , CardBody, CardFooter, CardTitle, Row, Col, } from "reactstrap";
import CachedIcon from '@material-ui/icons/Cached';
import CourseLogo from '../../../assests/img/courses.png';
import TotalStudentsLogo from '../../../assests/img/graduated.png';
import InvitesLogo from '../../../assests/img/game.png';
import RevenueLogo from '../../../assests/img/money-bag.png';

function Stats(props){

  function getTotalStudents(){
    let students = 0;
    if(props.courses){
      props.courses.map(course => {
        students = students + course.students.length
      })
    }
    return students
  }

  function getTotalInvites(){
    let invites = 0;
    if(props.courses){
      props.courses.map(course => {
        invites = invites + course.invites.length
      })
    }
    return invites
  }

  function getRevenue(){
    let revenue = 0;
    if(props.courses){
      props.courses.map(course => {
        revenue = revenue + (Number(course.fees) * course.students.length)
      })
    }
    return revenue
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
                        <hr className="mt-1"/>
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
                                    <img src={TotalStudentsLogo} alt="Total-Students-Logo" width="100%" />
                                </div>
                            </Col>
                            <Col md="8" xs="7">
                                <div className="number">
                                    <p className="p-0 m-0 card-category">Students Enrolled</p>
                                        <CardTitle tag="p" className="m-0">{getTotalStudents()}</CardTitle>
                                    <p />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="dashview-footer">
                        <hr className="mt-1"/>
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
                                    <p />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="dashview-footer">
                        <hr className="mt-1"/>
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
                                    <img src={RevenueLogo} alt="Revenue-Logo" width="100%" />
                                </div>
                            </Col>
                            <Col md="8" xs="7">
                                <div className="number">
                                    <p className="p-0 m-0 card-category">Revenue</p>
                                        <CardTitle tag="p" className="m-0">Rs {getRevenue()}</CardTitle>
                                    <p />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="dashview-footer">
                        <hr className="mt-1"/>
                        <div className="footer-text">
                            <CachedIcon style={{display:"inline-block"}}/> Update Now
                        </div>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
        /* <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */
    )
}

export default Stats