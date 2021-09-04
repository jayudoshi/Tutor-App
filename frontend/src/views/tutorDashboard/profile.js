import React, { useState } from 'react';

import { Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { FormControl, Input , MenuItem, Select, TextareaAutosize } from '@material-ui/core';
import Header from '../../components/Dashboard/Header/header';

function Profile(props){
    const [user , setUser] = useState(props.user.credentials);
    const [tutorProfile , setTutorProfile] = useState(user.tutorProfile)
    const [disabled , setDisabled] = useState(true)
    const [disableEdit , setDisableEdit] = useState(false)
    const [disableSave , setDisableSave] = useState(true)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [userChange , setUserChange] = useState(false);
    const [tutorChange , setTutorChange] = useState(false);
    const [fname , setFname] = useState({
        err: "",
        valid: true
    })
    const [lname , setLname] = useState({
        err: "",
        valid: true
    })
    const [collegeName , setCollegeName] = useState({
        err: "",
        valid: true
    });
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
    const [aboutYou , setAboutYou] = useState({
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
        if(tutorChange && !userChange){
            props.updateUser(null , tutorProfile , "Tutor")
        }
        else if(userChange && !tutorChange){
            props.updateUser(user , null , "Tutor")
        }
        else if(userChange && tutorChange){
            props.updateUser(user , tutorProfile , "Tutor")
        }
        else if(!userChange && !tutorChange){
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

    function handleTutorChange(event){
        setTutorChange(true)
        setTutorProfile(prevState => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }

    function Validate(){
        
        if(user.fname.length < 2){
            setFname(prevState => ({
                ...prevState,
                err: "First Name should be minimumm of 2 characters long!!",
                valid: false
            }))
        }
        if(user.fname === "" ){
            setFname(prevState => ({
                ...prevState,
                err: "First Name can't be empty!!",
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
         
        if(user.lname.length < 2){
            setLname(prevState => ({
                ...prevState,
                err: "Last Name should be minimumm of 2 characters long!!",
                valid: false
            }))
        }
        if(user.lname === "" ){
            setLname(prevState => ({
                ...prevState,
                err: "Last Name can't be empty!!",
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

        if(tutorProfile.collegeName.length <= 2){
            setCollegeName(prevState => ({
                ...prevState,
                err: "Invalid College Name!!",
                valid: false
            }))
        }
        if(tutorProfile.collegeName === "" ){
            setCollegeName(prevState => ({
            ...prevState,
            err: "College Name can't be empty!!",
            valid: false
            }))
        }
        if(tutorProfile.collegeName.length > 2){
            setCollegeName(prevState => ({
                ...prevState,
                err: "",
                valid: true
            }))
        }

        if(tutorProfile.email === "" ){
            setEmail(prevState => ({
            ...prevState,
            err: "Email can't be empty!!",
            valid: false
            }))
        }if(!re.test(tutorProfile.email)){
            setEmail(prevState => ({
                ...prevState,
                err: "Invalid Email Id",
                valid: false
                }))
        }
        if(re.test(tutorProfile.email)){
            setEmail(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }
            
        if(tutorProfile.state === "" ){
            setState(prevState => ({
            ...prevState,
            err: "State can't be empty!!",
            valid: false
            }))
        }if(tutorProfile.state !== ""){
            setState(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }
        
        if(tutorProfile.city === "" ){
            setCity(prevState => ({
            ...prevState,
            err: "City can't be empty!!",
            valid: false
            }))
        }if(tutorProfile.city !== ""){
            setCity(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }

        if(tutorProfile.town === "" ){
            setTown(prevState => ({
            ...prevState,
            err: "Town can't be empty!!",
            valid: false
            }))
        }if(tutorProfile.town !== ""){
            setTown(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }

        if(tutorProfile.pinCode === "" ){
            setPinCode(prevState => ({
            ...prevState,
            err: "Invalid Pincode!!",
            valid: false
            }))
        }if(tutorProfile.pinCode.length !== 6 ){
            setPinCode(prevState => ({
            ...prevState,
            err: "Invalid Pincode!!",
            valid: false
            }))
        }if(tutorProfile.pinCode.length === 6){
            setPinCode(prevState => ({
            ...prevState,
            err:"",
            valid: true
            }))
        }

        if(tutorProfile.aboutYou === "" ){
            setAboutYou(prevState => ({
            ...prevState,
            err: "About You can't be empty!!",
            valid: false
            }))
        }
        if(tutorProfile.aboutYou.length > 2){
            setAboutYou(prevState => ({
                ...prevState,
                err: "",
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
                                            value={user.fname} disabled={disabled}
                                            onChange={handleChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{fname.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Last Name</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="lname" placeholder={user.lname} autoComplete='off' 
                                            value={user.lname} disabled={disabled}
                                            onChange={handleChange} onBlur={Validate}
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
                                            value={tutorProfile.gender}
                                            onChange={handleTutorChange}
                                            >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Date Of Birth</Label>
                                        <Input style={{fontSize:"1.8rem" , borderBottom:"0px" , padding:"0px"}}
                                            className="col-12 input-field" bssize="lg" type="date"
                                            name="dob" placeholder={tutorProfile.dob} autoComplete='off' 
                                            defaultValue={formatDate(tutorProfile.dob)} disabled={disabled}
                                            onChange={handleTutorChange}
                                        />
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Highest Qualification</Label>
                                        <FormControl disabled={disabled} className="input-field" required style={{width:"100%" , color:"#10293C"}}>
                                            <Select
                                            name="highestQualification"
                                            labelId="HQ"
                                            id="hq"
                                            style={{fontSize:"1.8rem"}}
                                            value={tutorProfile.highestQualification}
                                            onChange={handleTutorChange}
                                            
                                            >
                                            <MenuItem value="MA">MA</MenuItem>
                                            <MenuItem value="BE">BE</MenuItem>
                                            <MenuItem value="B.TECH">B.TECH</MenuItem>
                                            <MenuItem value="M.TECH">M.TECH</MenuItem>
                                            <MenuItem value="B>SC">B.SC</MenuItem>
                                            <MenuItem value="M.SC">M.SC</MenuItem>
                                            <MenuItem value="BCA">BCA</MenuItem>
                                            <MenuItem value="MCA">MCA</MenuItem>
                                            <MenuItem value="BBA">BBA</MenuItem>
                                            <MenuItem value="MBA">MBA</MenuItem>
                                            <MenuItem value="B.ARCH">B.ARCH</MenuItem>
                                            <MenuItem value="MBBS">MBBS</MenuItem>
                                            <MenuItem value="MD">MD</MenuItem>
                                            <MenuItem value="BDS">BDS</MenuItem>
                                            <MenuItem value="BPT">BPT</MenuItem>
                                            <MenuItem value="B.PHARM">B.PHARM</MenuItem>
                                            <MenuItem value="M.PHARM">M.PHARM</MenuItem>
                                            <MenuItem value="B.COM">B.COM</MenuItem>
                                            <MenuItem value="M.COM">M.COM</MenuItem>
                                            <MenuItem value="CA">CA</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Status</Label>
                                        <FormControl disabled={disabled} className="input-field" required style={{width:"100%" , color:"#10293C"}}>
                                            <Select
                                            name="status"
                                            id="status"
                                            style={{fontSize:"1.8rem"}}
                                            value={tutorProfile.status}
                                            onChange={handleTutorChange}
                                            >
                                            <MenuItem value="Pursuing">Pursuing</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">College Name</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="collegeName" placeholder={tutorProfile.collegeName} autoComplete='off' 
                                            value={tutorProfile.collegeName} disabled={disabled}
                                            onChange={handleTutorChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{collegeName.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Current Occupation</Label>
                                        <FormControl disabled={disabled} className="input-field" required style={{width:"100%" , color:"#10293C"}}>
                                            <Select
                                            name="currentOccupation"
                                            id="co"
                                            style={{fontSize:"1.8rem"}}
                                            value={tutorProfile.currentOccupation}
                                            onChange={handleTutorChange}
                                            >
                                                <MenuItem value="Full-Time Teacher">Full-Time Teacher</MenuItem>
                                                <MenuItem value="Freelancer">Freelancer</MenuItem>
                                                <MenuItem value="Working Professional">Working Professional</MenuItem>
                                                <MenuItem value="College Student">College Student</MenuItem>
                                                <MenuItem value="Unemployed">Unemployed</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="col-md-12 p-3">
                                        <Label className="col-12" size="lg">Email Address</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="email" 
                                            name="email" placeholder={tutorProfile.email} autoComplete='off' 
                                            value={tutorProfile.email} disabled={disabled}
                                            onChange={handleTutorChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{email.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">State</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="state" placeholder={tutorProfile.state} autoComplete='off' 
                                            value={tutorProfile.state} disabled={disabled}
                                            onChange={handleTutorChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{state.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">City</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="city" placeholder={tutorProfile.city} autoComplete='off' 
                                            value={tutorProfile.city} disabled={disabled}
                                            onChange={handleTutorChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{city.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Town</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="text" 
                                            name="town" placeholder={tutorProfile.town} autoComplete='off' 
                                            value={tutorProfile.town} disabled={disabled}
                                            onChange={handleTutorChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{town.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-md-6 p-3">
                                        <Label className="col-12" size="lg">Pin Code</Label>
                                        <Input style={{fontSize:"1.8rem"}}
                                            className="col-12 input-field" bssize="lg" type="number" 
                                            name="pinCode" placeholder={tutorProfile.pinCode} autoComplete='off' 
                                            value={tutorProfile.pinCode} disabled={disabled}
                                            onChange={handleTutorChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{pinCode.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-12 p-3">
                                        <Label className="col-12" size="lg">Tell Us Something About You</Label>
                                        <TextareaAutosize
                                            minRows={3} maxRows={3} style={{fontSize:"1.8rem",resize:"none"}}
                                            className="p-3 col-12 input-field-teaxtarea" bssize="lg" 
                                            name="aboutYou" placeholder={tutorProfile.aboutYou} autoComplete='off' 
                                            value={tutorProfile.aboutYou} disabled={disabled}
                                            onChange={handleTutorChange} onBlur={Validate}
                                        />
                                        <FormFeedback style={{color:"red" , display:"block"}}>{aboutYou.err}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="col-12 p-3 text-center">
                                        <button onClick={handleEdit} className="btn-lg btn-outline-dark" style={{marginRight:"3%"}}
                                            disabled={disableEdit}
                                        >
                                            Edit Profile <EditIcon style={{marginBottom:"3px" ,display:"inline"}} />
                                        </button>
                                        <button onClick={handleSave} className="btn-lg btn-outline-success"
                                            disabled={disableSave || !fname.valid || !lname.valid || !collegeName.valid || !email.valid || !state.valid || !city.valid || !town.valid || !pinCode.valid || !aboutYou.valid}
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