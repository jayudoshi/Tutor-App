import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";

function Invites(props){

    function renderPending(){

        if(!props.invites){
            return
        }
        const invites = props.invites.filter(invite => invite.status === 'Pending')

        const renderInvites = () => {
            return invites.map(invite => {
                return (
                    <tr key={invite._id}>
                        <td className="align-middle">{invite.course.name}</td>
                        <td className="align-middle">{invite.course.tutor.fname + ' ' + invite.course.tutor.lname}</td>
                        <td className="align-middle">{invite.course.subject}</td>
                        <td className="align-middle">{invite.course.mode}</td>
                        <td className="align-middle">{invite.course.timings}</td>
                        <td className="align-middle"><div className="pill">Pending</div></td>
                    </tr>
                )
            })
        }

        return (

            <Row className="mt-3 mb-3">
                <Col md="12">
                    <Card className="dashview">
                        <CardHeader className="table-header">
                            <CardTitle tag="h3" className="footer-text">
                                <div className="container p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            Invites Pending
                                        </div>
                                        <div className="col-12" style={{fontSize:"1.2rem"}}>
                                            <small>{invites.length} Pending</small>
                                        </div>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {invites.length === 0 && <h5 style={{color:"#7C7C7A"}}>Zero Pending Invites</h5>}
                            {invites.length !== 0 && <Table responsive className="m-0">
                                <thead className="table-heading">
                                    <tr>
                                    <th>Name</th>
                                    <th>Tutor</th>
                                    <th>Subject</th>
                                    <th>Mode</th>
                                    <th>Timings</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderInvites()}
                                </tbody>
                            </Table>}
                        </CardBody>
                    </Card>
                </Col>
            </Row> 
        )
    }

    function renderApproved(){

        if(!props.invites){
            return
        }
        const invites = props.invites.filter(invite => invite.status === 'Accepted')

        const renderInvites = () => {
            return invites.map(invite => {
                return (
                    <tr key={invite._id}>
                        <td className="align-middle">{invite.course.name}</td>
                        <td className="align-middle">{invite.course.tutor.fname + ' ' + invite.course.tutor.lname}</td>
                        <td className="align-middle">{invite.course.subject}</td>
                        <td className="align-middle">{invite.course.mode}</td>
                        <td className="align-middle">{invite.course.timings}</td>
                        <td className="align-middle"><div className="pill">Approved</div></td>
                    </tr>
                )
            })
        }

        return (

            <Row className="mt-3 mb-3">
                <Col md="12">
                    <Card className="dashview">
                        <CardHeader className="table-header">
                            <CardTitle tag="h3" className="footer-text">
                                <div className="container p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            Invites Approved
                                        </div>
                                        <div className="col-12" style={{fontSize:"1.2rem"}}>
                                            <small>{invites.length} Approved</small>
                                        </div>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {invites.length === 0 && <h5 style={{color:"#7C7C7A"}}>Zero Approved Invites</h5>}
                            {invites.length !== 0 && <Table responsive className="m-0">
                                <thead className="table-heading">
                                    <tr>
                                    <th>Name</th>
                                    <th>Tutor</th>
                                    <th>Subject</th>
                                    <th>Mode</th>
                                    <th>Timings</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderInvites()}
                                </tbody>
                            </Table>}
                        </CardBody>
                    </Card>
                </Col>
            </Row> 
        )
    }

    function renderDeclined(){

        if(!props.invites){
            return
        }
        const invites = props.invites.filter(invite => invite.status === 'Declined')

        const renderInvites = () => {
            return invites.map(invite => {
                return (
                    <tr key={invite._id}>
                        <td className="align-middle">{invite.course.name}</td>
                        <td className="align-middle">{invite.course.tutor.fname + ' ' + invite.course.tutor.lname}</td>
                        <td className="align-middle">{invite.course.subject}</td>
                        <td className="align-middle">{invite.course.mode}</td>
                        <td className="align-middle">{invite.course.timings}</td>
                        <td className="align-middle"><div className="pill">Declined</div></td>
                    </tr>
                )
            })
        }

        return (

            <Row className="mt-3 mb-3">
                <Col md="12">
                    <Card className="dashview">
                        <CardHeader className="table-header">
                            <CardTitle tag="h3" className="footer-text">
                                <div className="container p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            Invites Declined
                                        </div>
                                        <div className="col-12" style={{fontSize:"1.2rem"}}>
                                            <small>{invites.length} Declined</small>
                                        </div>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {invites.length === 0 && <h5 style={{color:"#7C7C7A"}}>Zero Declined Invites</h5>}
                            {invites.length !== 0 && <Table responsive className="m-0">
                                <thead className="table-heading">
                                    <tr>
                                    <th>Name</th>
                                    <th>Tutor</th>
                                    <th>Subject</th>
                                    <th>Mode</th>
                                    <th>Timings</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderInvites()}
                                </tbody>
                            </Table>}
                        </CardBody>
                    </Card>
                </Col>
            </Row> 
        )
    }

    return(
        <React.Fragment>
            {renderPending()}
            {renderApproved()}
            {renderDeclined()}
        </React.Fragment>
    )
}

export default Invites;