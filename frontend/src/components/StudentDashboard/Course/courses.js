import React from 'react';

import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";

function Courses(props){

    function renderCourses(){
        if(props.courses){
            if(props.courses.length === 0){
                return 
            }
            return props.courses.map(course => {
                return (
                    <tr key={course._id}>
                        <td>{course.name}</td>
                        <td>{course.subject}</td>
                        <td>{course.tutor.fname + ' ' + course.tutor.lname}</td>
                        <td>{course.timings}</td>
                        <td>{course.mode}</td>
                        <td className="text-right">{course.fees}</td>
                    </tr>
                )
            })
        }
    }

    return (
        <Row>
            <Col md="12">
                <Card className="dashview">
                    <CardHeader className="table-header">
                        <CardTitle tag="h3" className="footer-text">My Courses</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {props.courses && props.courses.length === 0 && <h5 style={{color:"#7C7C7A"}}>Zero Courses Enrolled</h5>}
                        {props.courses && props.courses.length !==0 && <Table responsive>
                            <thead className="table-heading">
                                <tr>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Tutor</th>
                                <th>Timings</th>
                                <th>Mode</th>
                                <th className="text-right">Fess(per month)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCourses()}
                            </tbody>
                        </Table>}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Courses;