import React , { useState } from 'react';
import {Link, Redirect} from "react-router-dom";

import { Card , Input , Button, Label, FormFeedback, FormGroup, Form} from 'reactstrap'

import LockIcon from '@material-ui/icons/Lock';
import { baseUrl } from '../../config';

function Login_Credentials(props){

    const [credentials,setCredentials] = useState({username:"",password:""});
    const [username , setUsername] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [password , setPassword] = useState({
      focus: false,
      err: "",
      valid: null
    });
  
    function handleChange(event){
        if(event.target.name === "password"){
            if(event.target.value.length >= 8 && event.target.value.length <= 22){
                setPassword(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                }))
            }
        }
        setCredentials(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value
        }))
    }

    function handleFocus(event){
        if(event.target.name === "username"){
            setUsername(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "password"){
            setPassword(prevState => ({
                ...prevState,
                focus: true
            }))
        }
    }
  
    function Validate(event){
        if(event.target.name === "username"){
            if(username.focus){
                if(credentials.username === "" ){
                    setUsername(prevState => ({
                        ...prevState,
                        err: "Username can't be empty!!",
                        valid: false
                    }))
                }else if(credentials.username.length < 2){
                    setUsername(prevState => ({
                        ...prevState,
                        err: "Username should be minimumm of 2 characters long!!",
                        valid: false
                    }))
                }else if(credentials.username.length >= 48){
                    setUsername(prevState => ({
                        ...prevState,
                        err: "Username can be maximum of 48 characters long!!",
                        valid: false
                    }))
                }else{
                    setUsername(prevState => ({
                        ...prevState,
                        err:"",
                        valid: true
                    }))
                }
            }
        }else if(event.target.name === "password"){
            if(password.focus){
                if(credentials.password === "" ){
                    setPassword(prevState => ({
                        ...prevState,
                        err: "Password can't be empty!!",
                        valid: false
                    }))
                }else if(credentials.password.length < 8){
                    setPassword(prevState => ({
                        ...prevState,
                        err: "Password should be minimumm of 8 characters long!!",
                        valid: false
                    }))
                }else if(credentials.password.length >= 22){
                    setPassword(prevState => ({
                        ...prevState,
                        err: "Password can be maximum of 22 characters long!!",
                        valid: false
                    }))
                }else{
                    setPassword(prevState => ({
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
        fetch(baseUrl + "users/login" , {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
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

    function handleErr(resp){
        if(resp.err.name === "IncorrectUsernameError"){
            setUsername(prevState => ({
                ...prevState,
                err: "Incorrect Username!",
                valid: false
            }))
            setCredentials({username:"",password:""})
        }else if(resp.err.name === "IncorrectPasswordError"){
            setPassword(prevState => ({
                ...prevState,
                err: "Incorrect Password!",
                valid: false
            }))
            setCredentials(prevState => ({
                ...prevState,
                password:""
            }))
        }
    }

    function handleSuccess(resp){
        //dispatch user logged in action
        setCredentials({username:"",password:""});
        props.loginUser(resp.token , resp.user)
    }

    return(
        <Card className="container chatWindow form-container" style={{overflowY:"auto" , overflowX:"hidden"}}>
            {props.user && props.user.isAuthenticated && <Redirect to="/dashboard" />}
            <div className="row h-100">
                <div className="col p-5 m-auto">
                <div className="">
                    <h1 className="text-center" ><LockIcon fontSize='large' /></h1>
                    <h1 className="text-center">Sign In</h1>
                    <Form onSubmit= {handleSubmit} >
                        
                        <FormGroup className="mt-4">
                            <Label className="col" size="lg">Username</Label>
                            <Input 
                                invalid={username.focus ? username.valid === false : false} 
                                onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                                className="col input-field" bsSize="lg" type="text" 
                                name="username" placeholder="Enter Username" autoComplete='off' 
                                value={credentials.username}
                            />
                            <FormFeedback>{username.err}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup className="mt-2" style={{position:"relative"}}>
                            <Label className="col" size="lg">Password</Label>
                            <Input 
                                invalid={password.focus ? password.valid === false : false}
                                onChange={handleChange} onFocus={handleFocus} onBlur={Validate} 
                                className="col input-field" bsSize="lg" autoComplete='off'
                                name="password" placeholder="Enter Password" 
                                value={credentials.password} type="password"
                            />
                            <FormFeedback>{password.err}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label className="p-0 mt-3" size="lg"><h5>
                                <Link to="/#" className="nav-link d-inline navLink p-0" onClick={(e) => {e.preventDefault() ; props.setCredentialsView(false)}}> 
                                    Login With OTP!
                                </Link></h5>
                            </Label>
                        </FormGroup>
                        
                        <Button className="mt-1 w-100 rounded-pill sign-button" 
                        type="submit" size="lg block" disabled={!username.valid || !password.valid}>
                            Login
                        </Button>

                        <div className="text-center text-white">
                            <Label className="" size="lg">Not a User? <Link className="nav-link d-inline navLink" to='/signupPhone'> Sign Up!</Link> </Label>
                        </div>

                    </Form>
                </div>
                </div>
            </div>
        </Card>
    )
}

export default Login_Credentials;