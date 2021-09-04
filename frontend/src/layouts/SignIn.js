import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import LoginCredentials from "../components/Login/credentials";
import OTPView from "../components/Login/phone"

const SignIn = (props) => {

  const [credentialsView , setCredentialsView] = useState(true);

  return (
    <div className="App container-fluid h-100" style={{backgroundColor:"#E2E7EC"}}>
      {props.user && props.user.isAuthenticated && <Redirect to="/dashboard" />}
      {credentialsView && <LoginCredentials user={props.user} loginUser={props.loginUser} setCredentialsView={setCredentialsView}/>}
      {!credentialsView && <OTPView user={props.user} loginUser={props.loginUser} setCredentialsView={setCredentialsView}/>}
    
  </div>
  );
};

export default SignIn;