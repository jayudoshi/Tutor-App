import React from 'react';

import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap';
import Header from '../../components/Dashboard/Header/header';

function Tutors(props){

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
        return tutors
    }

    function renderTableData(tutors){
        return tutors.map(tutor => {
            return (
                <tr key={tutor._id}>
                    <td className="align-middle">{tutor.fname + ' ' + tutor.lname}</td>
                    <td className="align-middle">{tutor.tutorProfile.highestQualification}</td>
                    <td className="align-middle">{tutor.tutorProfile.status}</td>
                    <td className="align-middle">{tutor.tutorProfile.collegeName}</td>
                    <td className="align-middle">{tutor.tutorProfile.currentOccupation}</td>
                    <td className="align-middle">{tutor.tutorProfile.email}</td>
                    <td className="align-middle">{tutor.phoneNo}</td>
                </tr>
            )
        })
    }

    function renderTutors(){
        const tutors = getTutors();
        return (
            <Row className="mt-3 mb-3">
                <Col md="12">
                    <Card className="dashview">
                        <CardHeader className="table-header">
                            <CardTitle tag="h3" className="footer-text">
                                <div className="container p-0">
                                    <div className="row">
                                        <div className="col-12" style={{height:"40px"}}>
                                            My Tutors
                                        </div>
                                        <div className="col-12" style={{fontSize:"1.2rem"}}>
                                            <small>{tutors.length} Tutors</small>
                                        </div>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {tutors.length === 0 && <h5 style={{color:"#7C7C7A"}}>Zero Tutors</h5>}
                            {tutors.length !== 0 && <Table responsive className="m-0">
                                <thead className="table-heading">
                                    <tr>
                                    <th>Name</th>
                                    <th>HQ</th>
                                    <th>Status</th>
                                    <th>College Name</th>
                                    <th>Current Occupation</th>
                                    <th>Email Address</th>
                                    <th>Phone No.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableData(tutors)}
                                </tbody>
                            </Table>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }

    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view="My Tutors" toggle={props.toggle} setToggle={props.setToggle}/>
            {renderTutors()}
        </div>
    )
}

export default Tutors;