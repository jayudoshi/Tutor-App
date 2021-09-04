import React from 'react';
import Header from '../../components/Dashboard/Header/header';

import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";

function StudentView(props){
    
    function renderTable(course){
        return (
        <Row className="mt-3 mb-3">
            <Col md="12">
                <Card className="dashview">
                    <CardHeader className="table-header">
                        <CardTitle tag="h3" className="footer-text">
                            <div className="container p-0">
                                <div className="row">
                                    <div className="col-12" style={{height:"40px"}}>
                                        {course.name}
                                    </div>
                                    <div className="col-12" style={{fontSize:"1.2rem"}}>
                                        <small>{course.students.length} Students</small>
                                    </div>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        {course.students.length === 0 ? 
                            <h5 style={{color:"#7C7C7A"}}>At Present No Students have Enrolled</h5> 
                            :
                                <Table responsive className="m-0">
                                    <thead className="table-heading">
                                        <tr>
                                        <th>Name</th>
                                        <th>Phone No.</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Grade</th>
                                        <th>Board</th>
                                        <th>Stream</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderData(course.students)}
                                    </tbody>
                                </Table>
                        }
                    </CardBody>
                </Card>
            </Col>
        </Row>)
    }

    function renderData(students){
        return students.map(student => (
        <tr>
            <td>{student.fname} {student.lname}</td>
            <td>{student.phoneNo}</td>
            <td>{student.studentProfile.email}</td>
            <td>{student.studentProfile.city}</td>
            <td>{student.studentProfile.state}</td>
            <td>{student.studentProfile.grade}</td>
            <td>{student.studentProfile.board}</td>
            <td>{student.studentProfile.stream}</td>
        </tr>
        ))
    }

    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}} >
            <Header logoutUser={props.logoutUser} view="Invites" toggle={props.toggle} setToggle={props.setToggle}/>
            {props.courses && props.courses.map(course => renderTable(course))}
        </div>
    )
}

export default StudentView;