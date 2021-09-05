import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, } from "reactstrap";
import { baseUrl } from '../../../config';

function AllInvites(props){

    const [invites , setInvites] = useState(null);

    useEffect(() => {
        if(!invites){
            let users = [];
            if(props.course){
                if(props.course.invites){
                    props.course.invites.map(invite => {
                        if(!invite.from._id){
                            users.push(invite.from)
                        }
                    })
                    fetch(baseUrl + "users/all" , {
                        method:"POST",
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                        },
                        body: JSON.stringify(users)
                    })
                    .then(resp => resp.json())
                    .then(resp => {
                        if(resp.err){
                            console.log(resp.err);
                        }else{
                            users = resp.users
                            let Invites = props.course.invites;
                            Invites.map((invite,index) => {
                                if(!invite.from._id){
                                    const id = invite.from;
                                    const user = users.filter(user => user._id === id)[0];
                                    
                                    invite.from = user;
                                    Invites[index] = invite
                                }
                            })
                            setInvites(Invites);
                        }
                    })
                }
            }
        }
    } ,[])

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
                                        Invites
                                    </div>
                                    <div className="col-8" style={{textAlign:"right"}}>
                                        <button onClick={handleDeclineAll} disabled={props.course.invites.length === 0} className="declineall-btn">Decline All</button>
                                        <button onClick={handleAcceptAll} disabled={props.course.invites.length === 0} className="btn btn-outline-dark approveall-btn" >Accept All</button>
                                    </div>
                                    <div className="col-12" style={{fontSize:"1.2rem"}}>
                                        <small>{props.course.invites.length} Remaining</small>
                                    </div>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        {props.course.invites.length === 0 ?
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
    }

    function renderData(){
        if(invites){
            return invites.map(invite => {
                const from = invite.from
                if(from){
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
                }else{
                    return (
                        <React.Fragment></React.Fragment>
                    )
                }
            })
        }
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
                if(resp.course._id === props.course._id){
                    props.setCourse(resp.course);
                }
                props.setCourses(arr);
                const Invites =  invites.filter(Invite => Invite._id !== invite._id)
                setInvites(Invites);
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
                if(resp.course._id === props.course._id){
                    props.setCourse(resp.course);
                }
                props.setCourses(arr);
                const Invites =  invites.filter(Invite => Invite._id !== invite._id)
                setInvites(Invites);
            }
        })
    }

    function handleAcceptAll(){
        if(invites){
            const ids =[]
            invites.map(invite => {
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
                    setInvites([])
                }
            })
        }
    }

    function handleDeclineAll(){
        if(invites){
            const ids =[]
            invites.map(invite => {
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
                    setInvites([])
                }
            })
        }
    }

    return (
        renderTable()
    )
}

export default AllInvites;