import React, { useState } from 'react';
import {Link} from "react-router-dom";

import { Input , Button, Label, FormFeedback, FormGroup, Form} from 'reactstrap'

const BasicInfo = (props) => {
    
    const [credentials,setCredentials] = useState({
        gender:"",
        dob:"",
        email:"",
        state:"",
        city:"",
        town:"",
        pinCode:""
    });
    const [gender , setGender] = useState({
        focus: true,
        err: "",
        valid: null
    })
    const [dob , setDob] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [email , setEmail] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [state , setState] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [city , setCity] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [town , setTown] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [pinCode , setPinCode] = useState({
        focus: false,
        err: "",
        valid: null
    });
    
    function handleChange(event){
        if(event.target.name === "pinCode"){
            if(event.target.value.length === 6){
                setPinCode(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                }))
            }
            if(event.target.value.length < 6){
                setPinCode(prevState => ({
                    ...prevState,
                    err:"",
                    valid: null
                }))
            }
            if(event.target.value.length > 6){
                setPinCode(prevState => ({
                    ...prevState,
                    err:"Invalid Pincode!!",
                    valid: false
                }))
            }
            if(event.target.value.length === 6){
                if(credentials.gender === ""){
                    setGender(prevState => ({
                        ...prevState,
                        err: "Select a Gender",
                        valid:false
                    }))
                }
            }
        }
        setCredentials(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value
        }))
    }
    
    function handleFocus(event){
        if(event.target.name === "dob"){
            setDob(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "email"){
            setEmail(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "state"){
            setState(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "city"){
            setCity(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "town"){
            setTown(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "pinCode"){
            setPinCode(prevState => ({
                ...prevState,
                focus: true
            }))
        }
    }
    
    function Validate(event){
        if(event.target.name === "gender"){
            if(gender.focus){
                if(credentials.gender === ""){
                    setGender(prevState => ({
                        ...prevState,
                        err: "Select a Gender",
                        valid:false
                    }))
                }else{
                    setGender(prevState => ({
                        ...prevState,
                        err:"",
                        valid: true
                    }))
                }
            }
        }else if(event.target.name === "dob"){
            if(dob.focus){
                if(credentials.dob === "" ){
                    setDob(prevState => ({
                    ...prevState,
                    err: "Select a Date!!",
                    valid: false
                    }))
                }else{
                    setDob(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "email"){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(email.focus){
                if(credentials.email === "" ){
                    setEmail(prevState => ({
                    ...prevState,
                    err: "Email can't be empty!!",
                    valid: false
                    }))
                }else if (!re.test(credentials.email)){
                    setEmail(prevState => ({
                        ...prevState,
                        err: "Invalid Email Id",
                        valid: false
                        }))
                }
                else{
                    setEmail(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "state"){
            if(state.focus){
                if(credentials.state === "" ){
                    setState(prevState => ({
                    ...prevState,
                    err: "State can't be empty!!",
                    valid: false
                    }))
                }else{
                    setState(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "city"){
            if(city.focus){
                if(credentials.city === "" ){
                    setCity(prevState => ({
                    ...prevState,
                    err: "City can't be empty!!",
                    valid: false
                    }))
                }else{
                    setCity(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "town"){
            if(town.focus){
                if(credentials.town === "" ){
                    setTown(prevState => ({
                    ...prevState,
                    err: "Password can't be empty!!",
                    valid: false
                    }))
                }else{
                    setTown(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "pinCode"){
            if(pinCode.focus){
                if(credentials.pinCode === "" ){
                    setPinCode(prevState => ({
                    ...prevState,
                    err: "Invalid Pincode!!",
                    valid: false
                    }))
                }if(credentials.pinCode.length !== 6 ){
                    setPinCode(prevState => ({
                    ...prevState,
                    err: "Invalid Pincode!!",
                    valid: false
                    }))
                }if(credentials.pinCode.length === 6){
                    setPinCode(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        props.setCredentials(credentials)
        props.setBaseInfo(true)
    }

    return(
        <Form onSubmit= {handleSubmit} className="p-4" >
            <FormGroup>
                <Label className="p-0 mb-2" size="lg">Basic Info</Label>
                <div className="row">
                    <div className="col-6" style={{fontSize:"1.25rem"}}>
                        <FormGroup check inline>
                            <Label check>
                            <Input onChange={handleChange} onFocus={handleFocus} onBlur={Validate} value="Male" type="radio" name="gender"/> Male
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                            <Input onChange={handleChange} onFocus={handleFocus} onBlur={Validate} value="Female" type="radio" name="gender"/> Female
                            </Label>
                        </FormGroup>
                        {gender.err && <FormFeedback className="d-inline-block">{gender.err}</FormFeedback>}
                    </div>
                    <div className="col-6">
                        <FormGroup style={{marginTop:"3px"}}>
                            <Input type="date" onChange={handleChange} onFocus={handleFocus} onBlur={Validate} value={credentials.dob} name="dob" id="exampleDate" placeholder="DOB"/>
                            <hr className="m-0 p-0"></hr>
                            <p style={{color:"red"}}>{dob.err}</p>
                        </FormGroup>
                    </div>
                </div>
            </FormGroup>
            <FormGroup className="mt-3" >
                <Label className="p-0" size="lg">Email Address</Label>
                <Input 
                    invalid={email.focus ? email.valid === false : false} type="email" 
                    onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                    className="col input-field" bsSize="lg" autoComplete='off'
                    name="email" placeholder="Email Address" value={credentials.email}
                />
                <FormFeedback>{email.err}</FormFeedback>
            </FormGroup>

            <FormGroup className="mt-3" >
                <Label className="p-0" size="lg">Address</Label>
                <div className="row">
                    <div className="col-6">
                        <Input 
                            invalid={state.focus ? state.valid === false : false} type="text" 
                            onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                            className="col input-field" bsSize="lg" autoComplete='off'
                            name="state" placeholder="State" value={credentials.state}
                        />
                        <FormFeedback>{state.err}</FormFeedback>
                    </div>
                    <div className="col-6">
                        <Input 
                            invalid={city.focus ? city.valid === false : false} type="text"
                            onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                            className="col input-field" bsSize="lg" autoComplete='off'
                            name="city" placeholder="City" value={credentials.city}
                        />
                        <FormFeedback>{city.err}</FormFeedback>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Input 
                            invalid={town.focus ? town.valid === false : false} type="text" 
                            onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                            className="col input-field" bsSize="lg" autoComplete='off'
                            name="town" placeholder="Town" value={credentials.town}
                        />
                        <FormFeedback>{town.err}</FormFeedback>
                    </div>
                    <div className="col-6">
                        <Input 
                            invalid={pinCode.focus ? pinCode.valid === false : false} type="number"
                            onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                            className="col input-field" bsSize="lg" autoComplete='off'
                            name="pinCode" placeholder="Pin Code" value={credentials.pinCode}
                        />
                        <FormFeedback>{pinCode.err}</FormFeedback>
                    </div>
                </div>
            </FormGroup>

            <Button className="mt-5 w-100 rounded-pill sign-button" type="submit" size="lg block" 
            disabled={!gender.valid || !dob.valid || !email.valid || !state.valid || !city.valid || !town.valid || !pinCode.valid}>
                Next
            </Button>
            <div className="text-center text-white">
                <Label className="" size="lg">Already a User? <Link className="nav-link d-inline navLink" to='/signin'> Sign In!</Link> </Label>
            </div>
        </Form>
    )
}

export default BasicInfo;