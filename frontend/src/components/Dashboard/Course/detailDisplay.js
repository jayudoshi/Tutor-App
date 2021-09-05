import React, { useState } from 'react';

import { Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Label, Row } from 'reactstrap';

import { FormControl, Input, MenuItem, Select } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { baseUrl } from '../../../config';

function DetialDisplay(props){

    const [course , setCourse] = useState(props.course)
    const [disabled , setDisabled] = useState(true)
    const [disableEdit , setDisableEdit] = useState(false)
    const [disableSave , setDisableSave] = useState(true)
    const [change , setChange] = useState(false)
    const [fees , setFees] = useState({
        err: "",
        valid: true
    })

    function handleChange(event){
        setChange(true)

        if(event.target.name === "fees"){
            if(event.target.value === ""){
                setFees(prevState => ({
                    ...prevState,
                    err:"Fees can't be empty !!",
                    valid: false
                }))
            }else{
                setFees(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                }))
            }
        }

        setCourse(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    function handleEdit(event){
        event.preventDefault()
        setDisabled(false)
        setDisableSave(false)
        setDisableEdit(true)
    }

    function handleSave(event){
        event.preventDefault()
        setDisabled(true)
        setDisableSave(true)
        setDisableEdit(false)
        if(change){
            fetch(baseUrl + "courses/" + course._id , {
                method:"PUT",
                headers: {
                    'Content-Type':'application/json',
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
                body:JSON.stringify(course)
            })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.err){
                    console.log(resp.err)
                }else{
                    setCourse(course)
                    props.UpdateCourses(course)
                }
            })
        }
    }

    return(
        <Row className="mt-3 mb-3">
            <Col md="12">
                <Card className="dashview">
                    <CardHeader className="table-header">
                        <CardTitle tag="h3" className="footer-text">{course.name}</CardTitle>
                        <CardBody>
                            <Form className="row">
                                <FormGroup className="col-md-6 p-3">
                                    <Label className="p-0" size="lg">Class</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <Select
                                        labelId="class"
                                        id="Class"
                                        name="grade"
                                        value= {course.grade}
                                        onChange={handleChange}
                                        style={{fontSize:"1.8rem"}}
                                        >
                                        <MenuItem value="1st">1st</MenuItem>
                                        <MenuItem value="2nd">2nd</MenuItem>
                                        <MenuItem value="3rd">3rd</MenuItem>
                                        <MenuItem value="4th">4th</MenuItem>
                                        <MenuItem value="5th">5th</MenuItem>
                                        <MenuItem value="6th">6th</MenuItem>
                                        <MenuItem value="7th">7th</MenuItem>
                                        <MenuItem value="8th">8th</MenuItem>
                                        <MenuItem value="9th">9th</MenuItem>
                                        <MenuItem value="10th">10th</MenuItem>
                                        <MenuItem value="11th">11th</MenuItem>
                                        <MenuItem value="12th">12th</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="col-md-6 p-3">
                                    <Label className="p-0" size="lg">Board</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <Select
                                        labelId="board"
                                        id="Board"
                                        name="board"
                                        value={course.board}
                                        onChange={handleChange}
                                        style={{fontSize:"1.8rem"}}
                                        >
                                        <MenuItem value="State Board">State Board</MenuItem>
                                        <MenuItem value="ICSE">ICSE</MenuItem>
                                        <MenuItem value="CBSE">CBSE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="col-md-6 p-3">
                                    <Label className="p-0" size="lg">Subject</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <Select
                                        labelId="subject"
                                        id="Subject"
                                        name="subject"
                                        value={course.subject}
                                        onChange={handleChange}
                                        style={{fontSize:"1.8rem"}}
                                        >
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Maths">Maths</MenuItem>
                                        <MenuItem value="Phsyics">Phsyics</MenuItem>
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Marathi">Marathi</MenuItem>
                                        <MenuItem value="Gujrati">Gujrati</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="col-md-6 p-3">
                                    <Label className="p-0" size="lg">Mode of Teaching</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <Select
                                        labelId="mode"
                                        id="Mode"
                                        name="mode"
                                        value={course.mode}
                                        onChange={handleChange}
                                        style={{fontSize:"1.8rem"}}
                                        >
                                        <MenuItem value="Online">Online</MenuItem>
                                        <MenuItem value="Offline">Offline</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="col-md-6 p-3">
                                    <Label className="p-0" size="lg">Language</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <Select
                                        labelId="language"
                                        id="Language"
                                        name="language"
                                        value={course.language}
                                        style={{fontSize:"1.8rem"}}
                                        onChange={handleChange}
                                        >
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Hindi">Hindi</MenuItem>
                                        <MenuItem value="Both">Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="col-md-6 p-3">
                                    <Label className="p-0" size="lg">Preferred Timings</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <Select
                                        labelId="timings"
                                        id="Timings"
                                        name="timings"
                                        value={course.timings}
                                        onChange={handleChange}
                                        style={{fontSize:"1.8rem"}}
                                        >
                                        <MenuItem value="Morning">Morning</MenuItem>
                                        <MenuItem value="Afternoon">Afternoon</MenuItem>
                                        <MenuItem value="Evening">Evening</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="col-12 p-3">
                                    <Label className="col-12" size="lg">Fees (per Month)</Label>
                                    <Input style={{fontSize:"1.8rem"}}
                                        className="col-12 input-field" bsSize="lg" type="text" 
                                        name="fees" placeholder={course.fees} autoComplete='off' 
                                        value={course.fees} disabled={disabled} onChange={handleChange}
                                    />
                                    <FormFeedback style={{color:"red" , display:"block"}}>{fees.err}</FormFeedback>
                                </FormGroup>
                                <FormGroup className="col-12 p-3 text-center">
                                    <button onClick={handleEdit} className="btn-lg btn-outline-dark" style={{marginRight:"3%"}}
                                        disabled={disableEdit}
                                    >
                                        Edit Profile <EditIcon style={{marginBottom:"3px" ,display:"inline"}} />
                                    </button>
                                    <button onClick={handleSave} className="btn-lg btn-outline-success"
                                        disabled={disableSave || !fees.valid}
                                    >
                                        Save Profile <SaveIcon style={{marginBottom:"5px" ,display:"inline"}} />
                                    </button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </CardHeader>
                </Card>
            </Col>
        </Row>
    )
}

export default DetialDisplay;