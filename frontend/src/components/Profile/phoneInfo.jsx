import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { baseUrl } from '../../config';

import {Link , Redirect} from "react-router-dom";

import { Input , Button, Label, FormFeedback, FormGroup, Form} from 'reactstrap'

const PhoneInfo = () => {

    const [helperText , setHelperText] = useState(null)
    const [disableInput , setDisableInput] = useState(false)
    const [displayResend , setDisplayResend] = useState(false)
    const [clickedOTP , setClickedOTP] = useState(false);
    const [credentials , setCredentials] = useState({
        phoneNo: "",
        otp: "",
        verified: false
    })
    const [phoneNo , setPhoneNo] = useState({
        focus: false,
        err: "",
        valid: null
    })
    const [otp , setOtp] = useState({
        focus: true,
        err: "",
        valid: null
    });

    function handleChange(event){
        if(event.target.name === 'phoneNo'){
            if(event.target.value.length === 10){
                setPhoneNo(prevState => ({
                    ...prevState,
                    valid:true,
                }))
            }else if(event.target.value.length > 10){
                setPhoneNo(prevState => ({
                    ...prevState,
                    valid:false,
                    err:'Enter valid Phone No!!'
                }))
            }else{
                setPhoneNo(prevState => ({
                    ...prevState,
                    valid:false,
                    err:''
                }))
            }
        }
        setCredentials(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value
        }))
    }

    function handleFocus(event){
        if(event.target.name === "phoneNo"){
            setPhoneNo(prevState => ({
                ...prevState,
                focus: true
            }))
        }
    }

    function Validate(event){
        if(event.target.name === 'phoneNo'){
            if(phoneNo.focus){
                if(credentials.phoneNo === ''){
                    setPhoneNo(prevState => ({
                        ...prevState,
                        valid:false,
                        err:"Enter Credential!!"
                    }))
                }else if(credentials.phoneNo.length === 9){
                    setPhoneNo(prevState => ({
                        ...prevState,
                        valid:false,
                        err:"Enter valid Phone No!!"
                    }))
                }else if(!((new RegExp('[0-9]{10}')).test(credentials.phoneNo))){
                    setPhoneNo(prevState => ({
                        ...prevState,
                        valid:false,
                        err:"Enter valid Phone No!!"
                    }))
                }
                else{
                    setPhoneNo(prevState => ({
                        ...prevState,
                        valid:true,
                    }))
                }
            }
        }
    }

    function handleClick(){
        setDisplayResend(false)
        if(phoneNo.valid){
            setDisableInput(true)
            setOtp(prevState => ({
                ...prevState,
                focus: true,
                valid: false
            }))
            fetch( baseUrl + "otp/getOTP" , {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({phoneNo: credentials.phoneNo})
            })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.err){
                    handleErr(resp)
                }else{
                    handleSuccess(resp)
                }
            })
        }
    }

    function handleErr(resp){
        setDisableInput(false)
        if(resp.status === "Bad Request"){
            setHelperText("Network Error!! Retry in some moment")
        }else if(resp.status === "Phone Verification Failed!!" || resp.status === "Empty Credentials"){
            setPhoneNo(prevState => ({
                ...prevState,
                valid:false,
                err:resp.err
            }))
        }
    }

    function handleSuccess(resp){
        if(resp.success){
            setHelperText(resp.msg)
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        setDisplayResend(false)
        setDisableInput(true)
        fetch(baseUrl + "otp/register" , {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                phoneNo: credentials.phoneNo,
                otp: credentials.otp
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                errHandler(resp)
            }else{
                successHandler(resp)
            }
        })   
    }

    function errHandler(resp){
        setDisableInput(false)
        setCredentials(prevState => ({
            ...prevState,
            otp:""
        }))
        if(resp.status === "OTP Expired"){
            setHelperText(resp.err)
            setDisplayResend(true)
        }else if(resp.status === "Invalid Credentials"){
            setOtp(prevState => ({
                ...prevState,
                err:resp.err,
                valid: false
            }))
        }
    }

    function successHandler(resp){
        if(resp.status === "Verified"){
            setCredentials(prevState => ({
                ...prevState,
                verified: true
            }))
        }
    }

    return(
        <React.Fragment>
        {credentials.verified && <Redirect to={{ pathname: "/signUp", state: { phoneNo: credentials.phoneNo } }} />}
        <Form onSubmit= {handleSubmit} className="p-4" style={{marginTop:"5%"}} >
            <FormGroup>
                <Label className="p-0 mb-2" size="lg">Phone Number</Label>
                <Input type="tel" id="phone" name="phoneNo" placeholder="eg:- 0123-456-789" pattern="[0-9]{10}" 
                    invalid={phoneNo.focus ? phoneNo.valid === false && phoneNo.err !== "" : false} 
                    type="number" onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                    className="col input-field" bsSize="lg" autoComplete='off' value={credentials.phoneNo}
                    disabled = {disableInput}
                />
                <FormFeedback>{phoneNo.err}</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Label className="p-0 mb-2" size="lg">
                    <div className="mt-2">
                        <Link style={{fontSize:"1.2rem"}} onClick={(e) => {e.preventDefault() ; setClickedOTP(true) ; handleClick()}}
                        to="/#" className={phoneNo.valid ? "" : "disabled-link"}
                        >Get OTP</Link>
                    </div>
                </Label>
            </FormGroup>


            <FormGroup className="mt-3">
                <Label className="p-0 mb-2" size="lg">Enter OTP</Label>
                <div style={{width:"50%" , color:"#10293C"}} >
                <OtpInput  
                    onChange={(e) => {
                        setCredentials(prevState => {
                            if(e.length !== 4){
                                setOtp(prevState => ({
                                    ...prevState,
                                    err:"",
                                    valid: false
                                }))
                            }
                            if( e.length === 4){
                                setOtp(prevState => ({
                                    ...prevState,
                                    err:"",
                                    valid: true
                                }))
                            }
                            if(clickedOTP){
                                return {...prevState , otp:e}
                            }else{
                                return {...prevState}
                            }
                        })
                    }}
                    numInputs={4} 
                    value={credentials.otp} 
                    inputStyle={{
                        margin: "0px",
                        textAlign: "center",
                        lineHeight: "30px",
                        fontSize: "30px",
                        border: "solid 1px #10293C",
                        boxShadow: "0 0 5px #10293C inset",
                        outline: "none",
                        width: "60%",
                        transition: "all .2s ease-in-out",
                        borderRadius: "3px",
                        backgroundColor:"transparent",
                        padding:"2%"
                    }}

                />
                </div>
                {otp.err && <FormFeedback style={{display:"inline-block"}}>{otp.err}</FormFeedback>}
                {helperText && <p className="p-0 mt-3 mb-0" style={{fontSize:"1rem"}}>{helperText}</p>}
            </FormGroup>

            {displayResend && <FormGroup>
                <Label className="p-0 mb-2" size="lg">
                    <div className="mt-2">
                        <Link style={{fontSize:"1.2rem"}} onClick={(e) => {e.preventDefault() ; setDisplayResend(false) ; setHelperText(null) ; setClickedOTP(true) ; handleClick()}}
                        to="/#" className={phoneNo.valid ? "" : "disabled-link"}
                        >Resend OTP</Link>
                    </div>
                </Label>
            </FormGroup>}

            <Button className="mt-5 w-100 rounded-pill sign-button" type="submit" size="lg block"
                disabled={!phoneNo.valid || !otp.valid || !clickedOTP}
            >
                Verify OTP & Continue
            </Button>
            <div className="text-center text-white">
                <Label className="" size="lg">Already a User? <Link className="nav-link d-inline navLink" to='/signin'> Sign In!</Link> </Label>
            </div>
        </Form>
        </React.Fragment>
    )
}

export default PhoneInfo;