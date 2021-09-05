import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";
import { baseUrl } from '../../../config';

function Invites(props){

    function renderTable(){
        return(
        <Row className="mt-3 mb-3">
            <Col md="12">
                <Card className="dashview">
                    <CardHeader className="table-header">
                        <CardTitle tag="h3" className="footer-text">
                            <div className="container p-0">
                                <div className="row">
                                    <div className="col-4">
                                        Invites {props.type}
                                    </div>
                                    <div className="col-12" style={{fontSize:"1.2rem"}}>
                                        <small>{props.invites.length} {props.type}</small>
                                    </div>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                    {props.invites.length === 0 ? 
                        <h5 style={{color:"#7C7C7A"}}>Zero Invites {props.type}</h5> 
                        :
                        <Table responsive className="m-0">
                            <thead className="table-heading">
                                <tr>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>Board</th>
                                <th>Stream</th>
                                <th>Phone No</th>
                                <th>State</th>
                                <th>City</th>
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
        </Row> 
        )
    }

    function renderData(){
        return props.invites.map(invite => {
            const from = invite.from
            return (
                <tr>
                    <td className="align-middle"><h5>{props.type}</h5></td>
                    <td className="align-middle">{from.fname + " " + from.lname}</td>
                    <td className="align-middle">{from.studentProfile.grade}</td>
                    <td className="align-middle">{from.studentProfile.board}</td>
                    <td className="align-middle">{from.studentProfile.stream}</td>
                    <td className="align-middle">{from.phoneNo}</td>
                    <td className="align-middle">{from.studentProfile.state}</td>
                    <td className="align-middle">{from.studentProfile.city}</td>
                </tr>
            )
        })
    }

    function handleDecline(invite){
        fetch(baseUrl + "/invites/" + invite._id , {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify({
                status: "Declined"
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            if(resp.err){
                console.log(resp.err)
            }else{
                props.UpdateCourses(resp.course)
            }
        })
    }

    function handleAccept(invite){
        fetch(baseUrl + "/invites/" + invite._id , {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify({
                status: "Accepted"
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            if(resp.err){
                console.log(resp.err)
            }else{
                props.updateInvite(resp.invite)
                props.UpdateCourses(resp.course)
            }
        })
    }

    return(
        renderTable()
    )
}

export default Invites;