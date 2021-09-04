import React, { useState } from 'react';

import { Input , Button, Label, FormFeedback, FormGroup, Form} from 'reactstrap'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { baseUrl } from '../../config';

const TutorInfo = (props) => {

    const[nwErr , setNWErr] = useState(false)
    const [credentials , setCredentials] =useState({
        ...props.credentials,
        highestQualification: "",
        status: "",
        collegeName: "",
        currentOccupation: "",
        aboutYou:""
    })
    const [highestQualification , setHighestQualification] = useState({
        focus: false,
        err: "",
        valid: null
    })
    const [status , setStatus] = useState({
        focus: false,
        err: "",
        valid: null
    })
    const [collegeName , setCollegeName] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [currentOccupation , setCurrentOccupation] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [aboutYou , setAboutYou] = useState({
        focus: false,
        err: "",
        valid: null
    });

    function handleFocus(event){
        if(event.target.name === "collegeName"){
            setCollegeName(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "aboutYou"){
            setAboutYou(prevState => ({
                ...prevState,
                focus: true
            }))
        }
    }

    function handleChange(event){
        if(event.target.name === "aboutYou"){
            if(credentials.aboutYou.length > 0) {
                setAboutYou(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                }))
            }
        }
        setCredentials(prevState => ({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    function Validate(event){
        if(event.target.name === "collegeName"){
            if(collegeName.focus){
                if(credentials.collegeName === "" ){
                    setCollegeName(prevState => ({
                    ...prevState,
                    err: "College Name cannot be empty!!",
                    valid: false
                    }))
                }else{
                    setCollegeName(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "aboutYou"){
            if(aboutYou.focus){
                if(credentials.aboutYou === "" ){
                    setAboutYou(prevState => ({
                    ...prevState,
                    err: "About You cannot be empty!!",
                    valid: false
                    }))
                }else{
                    setAboutYou(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }
    }

    function ValidateHQ(){
        if(highestQualification.focus){
            if(credentials.highestQualification === "" ){
                setHighestQualification(prevState => ({
                ...prevState,
                err: "Select Qualification!!",
                valid: false
                }))
            }else{
                setHighestQualification(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateStatus(){
        if(status.focus){
            if(credentials.status === "" ){
                setStatus(prevState => ({
                ...prevState,
                err: "Select Status!!",
                valid: false
                }))
            }else{
                setStatus(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateCurrentOccupation(){
        if(currentOccupation.focus){
            if(credentials.currentOccupation === "" ){
                setCurrentOccupation(prevState => ({
                ...prevState,
                err: "Select Occupation!!",
                valid: false
                }))
            }else{
                setCurrentOccupation(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        fetch(baseUrl + "/users/updateProfile/tutor" , {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify(credentials)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                setNWErr(true)
            }else{
                props.updateProfile(resp.user) 
            }
        })     
    }

    return(
        <Form onSubmit= {handleSubmit} className="p-4" >
            <FormGroup className="mt-3 row" >
                <div className="col-6" style={{fontSize:"1.25rem"}}>
                    <Label className="p-0" size="lg">Highest Qualification</Label>
                    <FormControl required style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                        <InputLabel id="HQ">Highest Qualification</InputLabel>
                        <Select
                        name="highestQualification"
                        labelId="HQ"
                        id="hq"
                        value={credentials.highestQualification}
                        onChange={handleChange}
                        onFocus={() => {setHighestQualification(prevState => ({...prevState,focus: true})) ; ValidateHQ()}}
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
                    <FormFeedback style={{color:"red" , display:"block"}}>{highestQualification.err}</FormFeedback>
                </div>
                <div className="col-6" style={{fontSize:"1.25rem"}}>
                    <Label className="p-0" size="lg">Status</Label>
                    <FormControl required style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                        <InputLabel id="STATUS">Status</InputLabel>
                        <Select
                        name="status"
                        labelId="STATUS"
                        id="status"
                        value={credentials.status}
                        onChange={handleChange}
                        onFocus={() => {setStatus(prevState => ({...prevState,focus: true})) ; ValidateStatus()}}
                        >
                        <MenuItem value="Pursuing">Pursuing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <FormFeedback style={{color:"red" , display:"block"}}>{status.err}</FormFeedback>
                </div>
            </FormGroup>

            <FormGroup className="mt-3 row" >
                <div className="col-6" style={{fontSize:"1.25rem"}}>
                    <Label className="p-0" size="lg">Current Occupation</Label>
                    <FormControl required style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                        <InputLabel id="Occupation">Current Occupation</InputLabel>
                        <Select
                        name="currentOccupation"
                        labelId="Occupation"
                        id="occupation"
                        value={credentials.currentOccupation}
                        onChange={handleChange}
                        onFocus={() => {setCurrentOccupation(prevState => ({...prevState,focus: true})) ; ValidateCurrentOccupation()}}
                        >
                        <MenuItem value="Full-Time Teacher">Full-Time Teacher</MenuItem>
                        <MenuItem value="Freelancer">Freelancer</MenuItem>
                        <MenuItem value="Working Professional">Working Professional</MenuItem>
                        <MenuItem value="College Student">College Student</MenuItem>
                        <MenuItem value="Unemployed">Unemployed</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <FormFeedback style={{color:"red" , display:"block"}}>{currentOccupation.err}</FormFeedback>
                    </div>
                <div className="col-6" style={{fontSize:"1.25rem"}}>
                    <FormGroup style={{marginTop:"3px"}}>
                        <Label htmlFor="collegeName" className="p-0" size="lg">College Name</Label>
                        <Input
                            invalid={collegeName.focus ? collegeName.valid === false : false} type="text"
                            onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                            className="col input-field" bsSize="lg" autoComplete='off'
                            name="collegeName" placeholder="College Name" value={credentials.collegeName}
                        />
                        <FormFeedback style={{color:"red" , display:"block"}}>{collegeName.err}</FormFeedback>
                    </FormGroup>
                </div>
            </FormGroup>
            
            <FormGroup className="mt-3" >
                <Label className="p-0" size="lg">Tell Us Something About You</Label>
                <Input type="textarea" rows="4" style={{resize:"none"}}
                    invalid={aboutYou.focus ? aboutYou.valid === false : false} value={credentials.aboutYou}
                    onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                    className="col input-field-teaxtarea p-2" bsSize="lg" autoComplete='off'
                    name="aboutYou" placeholder="About You..." 
                />
                <FormFeedback style={{color:"red" , display:"block"}}>{aboutYou.err}</FormFeedback>
            </FormGroup>

            <Button className="mt-5 w-100 rounded-pill sign-button" type="submit" size="lg block"
                disabled={!highestQualification.valid || !status.valid || !currentOccupation.valid || !collegeName.valid || !aboutYou.valid }
            >
                Save
            </Button>
            {nwErr && <p className="p-0 mb-0 mt-1 text-center" style={{color:"whitesmoke" , fontSize:"1.2rem"}}>Network Err!! Retry in few moments</p>}
        </Form>
    )
}

export default TutorInfo;