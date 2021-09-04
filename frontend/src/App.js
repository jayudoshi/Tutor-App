import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PhoneVerify from "./layouts/PhoneVerify";
import SignIn from './layouts/SignIn'
import SignUp from "./layouts/SignUp";
import Dashboard from "./layouts/Dashboard";
import Profile from "./layouts/Profile";

import './assests/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import 'jquery/dist/jquery'
import 'popper.js/dist/popper'

import {loginUser , updateProfile , logoutUser , updateUser , fetchCourses} from './redux/ActionCreator'

const mapStateToProps = state => {
  return {
    user:state.user,
    courses:state.courses
  }
}

const mapDispatchToProps = (dispatch) => ({

  loginUser: (token , user) => dispatch(loginUser(token,user)),
  logoutUser: () => dispatch(logoutUser()),

  updateProfile: (user) => dispatch(updateProfile(user)),
  updateUser: (userUpdate , profileUpdate , role) => dispatch(updateUser(userUpdate , profileUpdate , role)),

  fetchCourses: () => dispatch(fetchCourses())
});

function App(props){

  const renderDashboard = () => {
    return <Dashboard 
      user={props.user} logoutUser={props.logoutUser} updateUser={props.updateUser}
      fetchCourses={props.fetchCourses} courses={props.courses}
    />
  }

  const renderSignIn = () => {
    return <SignIn 
      user={props.user} loginUser={props.loginUser}
    />
  }

  const renderSignUp = () => {
    return <SignUp />
  }

  const renderProfile = () => {
    return <Profile 
      user ={props.user} loginUser={props.loginUser} updateProfile={props.updateProfile}
    />
  }

  const renderPhoneVerify = () => {
    return <PhoneVerify 
      user={props.user}
    />
  }


  return(
    
      <Switch>
        <Route path="/dashboard" component={renderDashboard} />
        <Route path="/signIn" component={renderSignIn} />
        <Route path="/signUp" component={renderSignUp} />
        <Route path="/signUpPhone" component={renderPhoneVerify} />
        <Route path="/profile" component={renderProfile} />
        <Redirect to="/signIn"/>
      </Switch>
    
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));