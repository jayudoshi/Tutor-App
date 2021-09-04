import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";

function StudentList(props){

    function renderTable(){
        return (
        <Row className="mt-3 mb-3">
            <Col md="12">
                <Card className="dashview">
                    <CardHeader className="table-header">
                        <CardTitle tag="h3" className="footer-text">
                            <div className="container p-0">
                                <div className="row">
                                    <div className="col-12" style={{height:"40px"}}>
                                        My Students
                                    </div>
                                    <div className="col-12" style={{fontSize:"1.2rem"}}>
                                        <small>{props.students.length} Students</small>
                                    </div>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        {props.students.length === 0 ? 
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderData()}
                                    </tbody>
                                </Table>    
                        }
                    </CardBody>
                </Card>
            </Col>
        </Row>)
    }

    function renderData(){
        return props.students.map(student => (
        <tr>
            <td>{student.fname} {student.lname}</td>
            <td>{student.phoneNo}</td>
            <td>{student.studentProfile.email}</td>
            <td>{student.studentProfile.city}</td>
            <td>{student.studentProfile.state}</td>
        </tr>
        ))
    }

    return (
        renderTable()
    )
}

export default StudentList;