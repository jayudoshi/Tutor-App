import React from 'react';

import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";

function Courses(props){

    function renderData(){
        if(props.courses){
            return (
                props.courses.map(course => (
                    <tr>
                        <td className="text-center">{course.name}</td>
                        <td className="text-center">{course.fees}</td>
                        <td className="text-center">{course.timings}</td>
                        <td className="text-center">{course.mode}</td>
                        <td className="text-center">{course.students.length}</td>
                        <td className="text-center">{course.invites.length}</td>
                        <td className="text-center">{course.subject}</td>
                        {course.language === "Both" ? <td className="text-center">English & Hindi</td> : <td className="text-center">{course.language}</td>}
                        <td className="text-center">{course.board}</td>
                        <td className="text-center">{course.grade}</td>
                    </tr>  
                ))
            )
        }else{
            return <React.Fragment></React.Fragment>
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
                        <Table responsive>
                        <thead className="table-heading">
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Fees(per month)</th>
                                <th className="text-center">Timings</th>
                                <th className="text-center">Mode</th>
                                <th className="text-center">Students</th>
                                <th className="text-center">Invites</th>
                                <th className="text-center">Subject</th>
                                <th className="text-center">Language</th>
                                <th className="text-center">Board</th>
                                <th className="text-center">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderData()}
                        </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Courses;