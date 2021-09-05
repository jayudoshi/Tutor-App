import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";
import { baseUrl } from '../../../config';

function Invites(props){

    function renderTable(){
        if(props.invites){
            return(
                <Row className="mt-3 mb-3">
                    <Col md="12">
                        <Card className="dashview">
                            <CardHeader className="table-header">
                                <CardTitle tag="h3" className="footer-text">
                                    <div className="container p-0">
                                        <div className="row">
                                            <div className="col-4">
                                                Invites
                                            </div>
                                            <div className="col-8" style={{textAlign:"right"}}>
                                                <button onClick={handleDeclineAll} disabled={props.invites.length === 0} className="declineall-btn">Decline All</button>
                                                <button onClick={handleAcceptAll} disabled={props.invites.length === 0} className="btn btn-outline-dark approveall-btn" >Accept All</button>
                                            </div>
                                            <div className="col-12" style={{fontSize:"1.2rem"}}>
                                                <small>{props.invites.length} Remaining</small>
                                            </div>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                {props.invites.length === 0 ?
                                    <h5 style={{color:"#7C7C7A"}}>Zero New Invites</h5> 
                                    :
                                    <Table responsive className="m-0">
                                        <thead className="table-heading">
                                            <tr>
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
        }else{
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }

    function renderData(){
        return props.invites.map(invite => {
            const from = invite.from
            return (
                <tr key={invite._id}>
                    <td className="align-middle">{from.fname + " " + from.lname}</td>
                    <td className="align-middle">{from.studentProfile.grade}</td>
                    <td className="align-middle">{from.studentProfile.board}</td>
                    <td className="align-middle">{from.studentProfile.stream}</td>
                    <td className="align-middle">{from.phoneNo}</td>
                    <td className="align-middle">{from.studentProfile.state}</td>
                    <td className="align-middle">{from.studentProfile.city}</td>
                    <td className="align-mddile" align="center">
                        <button onClick={() => handleDecline(invite)} className="decline-btn">Decline</button>
                        <button onClick={() => handleAccept(invite)} className="btn btn-outline-dark approve-btn" >Accept</button>
                    </td>
                </tr>
            )
        })
    }

    function handleDecline(invite){
        fetch(baseUrl + "invites/" + invite._id , {
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
            if(resp.err){
                console.log(resp.err)
            }else{
                let index;
                props.courses.map((course,id) => {
                    if(course._id === resp.course._id){
                        index = id
                    }
                })
                let arr = props.courses;
                arr[index] = resp.course
                props.setCourse(resp.course);
                props.setCourses(arr);
                props.setDeclined(prevState => [invite , ...prevState])
                props.setStudents([...resp.course.students])
            }
        })
    }

    function handleAccept(invite){
        fetch(baseUrl + "invites/" + invite._id , {
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
            if(resp.err){
                console.log(resp.err)
            }else{
                let index;
                props.courses.map((course,id) => {
                    if(course._id === resp.course._id){
                        index = id
                    }
                })
                let arr = props.courses;
                arr[index] = resp.course
                props.setCourse(resp.course);
                props.setCourses(arr);
                props.setAccepted(prevState => [invite , ...prevState])
                props.setStudents([...resp.course.students])
            }
        })
    }

    function handleAcceptAll(){
        const ids =[]
        props.invites.map(invite => {
            ids.push(invite._id)
        })
        fetch(baseUrl + "invites/all" , {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify({
                status: "Accepted",
                invites: ids
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                let index;
                props.courses.map((course,id) => {
                    if(course._id === resp.course._id){
                        index = id
                    }
                })
                let arr = props.courses;
                arr[index] = resp.course
                props.setCourse(resp.course);
                props.setCourses(arr);
                props.setAccepted(prevState => [...props.invites , ...prevState])
                props.setStudents([...resp.course.students])
            }
        })
    }

    function handleDeclineAll(){
        const ids =[]
        props.invites.map(invite => {
            ids.push(invite._id)
        })
        fetch(baseUrl + "invites/all" , {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify({
                status: "Declined",
                invites: ids
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                let index;
                props.courses.map((course,id) => {
                    if(course._id === resp.course._id){
                        index = id
                    }
                })
                let arr = props.courses;
                arr[index] = resp.course;
                props.setCourse(resp.course);
                props.setCourses(arr);
                props.setDeclined(prevState => [...props.invites , ...prevState])
                props.setStudents([...resp.course.students])
                props.setInvites(resp.invites)
            }
        })
    }

    return(
        renderTable()
    )
}

export default Invites;