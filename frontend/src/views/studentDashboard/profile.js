import React, { useState } from 'react';

import { Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { FormControl, Input, MenuItem, Select } from '@material-ui/core';
import Header from '../../components/Dashboard/Header/header';

function Profile(props){
    const [user , setUser] = useState(props.user.credentials);
    const [studentProfile , setStudentProfile] = useState(user.studentProfile)
    const [disabled , setDisabled] = useState(true);
    const [disableEdit , setDisableEdit] = useState(false)
    const [disableSave , setDisableSave] = useState(true)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [userChange , setUserChange] = useState(false);
    const [studentChange , setStudentChange] = useState(false);
    const [fname , setFname] = useState({
        err: "",
        valid: true
    })
    const [lname , setLname] = useState({
        err: "",
        valid: true
    })
    const [email , setEmail] = useState({
        err: "",
        valid: true
    });
    const [state , setState] = useState({
        err: "",
        valid: true
    });
    const [city , setCity] = useState({
        err: "",
        valid: true
    });
    const [town , setTown] = useState({
        err: "",
        valid: true
    });
    const [pinCode , setPinCode] = useState({
        err: "",
        valid: true
    });

    function formatDate(date){
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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
        props.updateUser()
        localStorage.setItem('view' , "Profile")
        if(studentChange && !userChange){
            props.updateUser(null , studentProfile , "Student")
        }
        else if(userChange && !studentChange){
            props.updateUser(user , null , "Student")
        }
        else if(userChange && studentChange){
            props.updateUser(user , studentProfile , "Student")
        }
        else if(!userChange && !studentChange){
            setDisableEdit(false)
        }
    }

    function handleChange(event){
        setUserChange(true)
        setUser(prevState => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }

    function handleStudentChange(event){
        setStudentChange(true)
        setStudentProfile(prevState => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }

    function Validate(){
        if(user.fname === "" ){
            setFname(prevState => ({
                ...prevState,
                err: "First Name can't be empty!!",
                valid: false
            }))
        }
        if(user.fname.length < 2){
            setFname(prevState => ({
                ...prevState,
                err: "First Name should be minimumm of 2 characters long!!",
                valid: false
            }))
        }
        if(user.fname.length >= 22){
            setFname(prevState => ({
                ...prevState,
                err: "First Name can be maximum of 22 characters long!!",
                valid: false
            }))
        }if(user.fname.length > 2 && user.fname.length < 22){
            setFname(prevState => ({
                ...prevState,
                err:"",
                valid: true
            }))
        }
            
        if(user.lname === "" ){
            setLname(prevState => ({
                ...prevState,
                err: "Last Name can't be empty!!",
                valid: false
            }))
        }if(user.lname.length < 2){
            setLname(prevState => ({
                ...prevState,
                err: "Last Name should be minimumm of 2 characters long!!",
                valid: false
            }))
        }if(user.lname.length >= 22){
            setLname(prevState => ({
                ...prevState,
                err: "Last Name can be maximum of 22 characters long!!",
                valid: false
            }))
        }if(user.lname.length > 2 && user.lname.length <21){
            setLname(prevState => ({
                ...prevState,
                err:"",
                valid: true
            }))
        }

        if(studentProfile.email === "" ){
            setEmail(prevState => ({
            ...prevState,
            err: "Email can't be empty!!",
            valid: false
            }))
        }if(!re.test(studentProfile.email)){
            setEmail(prevState => ({
                ...prevState,
                err: "Invalid Email Id",
                valid: false
                }))
        }
        if(re.test(studentProfile.email)){
            setEmail(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }
            
        if(studentProfile.state === "" ){
            setState(prevState => ({
            ...prevState,
            err: "State can't be empty!!",
            valid: false
            }))
        }if(studentProfile.state !== ""){
            setState(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }
        
        if(studentProfile.city === "" ){
            setCity(prevState => ({
            ...prevState,
            err: "City can't be empty!!",
            valid: false
            }))
        }if(studentProfile.city !== ""){
            setCity(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }

        if(studentProfile.town === "" ){
            setTown(prevState => ({
            ...prevState,
            err: "Town can't be empty!!",
            valid: false
            }))
        }if(studentProfile.town !== ""){
            setTown(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }

        if(studentProfile.pinCode === "" ){
            setPinCode(prevState => ({
            ...prevState,
            err: "Invalid Pincode!!",
            valid: false
            }))
        }if(studentProfile.pinCode.length !== 6 ){
            setPinCode(prevState => ({
            ...prevState,
            err: "Invalid Pincode!!",
            valid: false
            }))
        }if(studentProfile.pinCode.length === 6){
            setPinCode(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }
            
    }

    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view="Profile" toggle={props.toggle} setToggle={props.setToggle}/>
            <Row>
                <Col md="12">
                    <Card className="dashview">
                        <CardHeader className="table-header">
                            <CardTitle tag="h3" className="footer-text">Profile</CardTitle>
                            <CardBody>
                                <Form className="row">
                                <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Username</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="username" placeholder={user.username} autoComplete='off' 
                                            value={user.username} disabled={true}
                                        />
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Phone Number</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="number" 
                                            name="phoneNo" placeholder={user.phoneNo} autoComplete='off' 
                                            value={user.phoneNo} disabled={true}
                                        />
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">First Name</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="fname" placeholder={user.fname} autoComplete='off' 
                                            value={user.fname} disabled={disabled} onChange={handleChange}
                                            onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{fname.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Last Name</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="lname" placeholder={user.lname} autoComplete='off' 
                                            value={user.lname} disabled={disabled} onChange={handleChange}
                                            onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{lname.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Gender</Label>
                                        <FormControl disabled={disabled} className="input-field" required style={{width:"100%" , color:"#10293C"}}>
                                            <Select
                                            name="gender"
                                            id="gender"
                                            style={{fontSize:"1.8rem"}}
                                            value={studentProfile.gender}
                                            onChange={handleStudentChange}
                                            >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Date Of Birth</Label>
                                        <Input style={{fontSize:"1.8rem" , borderBottom:"0px" , padding:"0px"}}
                                            className="col-12 input-field" bssize="lg" type="date" onChange={handleStudentChange}
                                            name="dob" placeholder={studentProfile.dob} autoComplete='off' 
                                            defaultValue={formatDate(studentProfile.dob)} disabled={disabled}
                                            onBlur={Validate}
                                        />
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Board</Label>
                                        <FormControl disabled={disabled} className="input-field" required style={{width:"100%" , color:"#10293C"}}>
                                            <Select
                                            name="board"
                                            id="board"
                                            style={{fontSize:"1.8rem"}}
                                            value={studentProfile.board}
                                            onChange={handleStudentChange}
                                            >
                                            <MenuItem value="State Board">State Board</MenuItem>
                                            <MenuItem value="ICSE">ICSE</MenuItem>
                                            <MenuItem value="CBSE">CBSE</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Grade</Label>
                                        <FormControl disabled={disabled} className="input-field" required style={{width:"100%" , color:"#10293C"}}>
                                            <Select
                                            name="grade"
                                            id="grade"
                                            style={{fontSize:"1.8rem"}}
                                            value={studentProfile.grade}
                                            onChange={handleStudentChange}
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
                                        <Label className="col-12" size="lg">Stream</Label>
                                        <FormControl disabled={disabled} className="input-field" required style={{width:"100%" , color:"#10293C"}}>
                                            <Select
                                            name="stream"
                                            id="stream"
                                            style={{fontSize:"1.8rem"}}
                                            value={studentProfile.stream}
                                            onChange={handleStudentChange}
                                            >
                                            <MenuItem value="PCM">PCM</MenuItem>
                                            <MenuItem value="PCB">PCB</MenuItem>
                                            <MenuItem value="Commerce">Commerce</MenuItem>
                                            <MenuItem value="Arts">Arts</MenuItem>
                                            <MenuItem value="School">School</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                    
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Email Address</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="email" placeholder={studentProfile.email} autoComplete='off' 
                                            value={studentProfile.email} disabled={disabled} onChange={handleStudentChange}
                                            onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{email.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">State</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="state" placeholder={studentProfile.state} autoComplete='off' 
                                            value={studentProfile.state} disabled={disabled} onChange={handleStudentChange}
                                            onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{state.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">City</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="city" placeholder={studentProfile.city} autoComplete='off' 
                                            value={studentProfile.city} disabled={disabled} onChange={handleStudentChange}
                                            onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{city.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Town</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="town" placeholder={studentProfile.town} autoComplete='off' 
                                            value={studentProfile.town} disabled={disabled} onChange={handleStudentChange}
                                            onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{town.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Pin Code</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="pinCode" placeholder={studentProfile.pinCode} autoComplete='off' 
                                            value={studentProfile.pinCode} disabled={disabled} onChange={handleStudentChange}
                                            onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{pinCode.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-12 p-3 text-center">
                                        <button onClick={handleEdit} className="btn-lg btn-outline-dark" style={{marginRight:"3%"}}
                                            disabled={disableEdit}
                                        >
                                            Edit Profile <EditIcon style={{marginBottom:"3px" ,display:"inline"}} />
                                        </button>
                                        <button onClick={handleSave} className="btn-lg btn-outline-success"
                                            disabled={disableSave || !fname.valid || !lname.valid || !email.valid || !state.valid || !city.valid || !town.valid || !pinCode.valid}
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
        </div>
    )
}

export default Profile