import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import BasicInfo from '../components/Profile/basicInfo';
import StudentInfo from '../components/Profile/studentInfo';
import TutorInfo from '../components/Profile/tutorInfo';

import { Card } from 'reactstrap'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Profile = (props) => {

    const [baseInfo , setBaseInfo] = useState(false);
    const [credentials , setCredentials] = useState({});


    return(
        <div className="App container-fluid h-100" style={{backgroundColor:"#E2E7EC"}}>
            
            {props.user && !props.user.isAuthenticated && <Redirect to="/signIn" />}
            {props.user && props.user.isAuthenticated && props.user.credentials.profileSetup && <Redirect to="/dashboard" />}

            <Card className="container chatWindow" >
            <div className="row h-100 overflow-auto" style={{marginRight:"0px"}}>
                <div className="col form-container m-auto">
                    <h1 className="text-center" ><AccountCircleIcon fontSize='large' /> Profile</h1>
                    {!baseInfo && <BasicInfo setCredentials={setCredentials} setBaseInfo={setBaseInfo} user={props.user} />}
                    {baseInfo && props.user.credentials.role === "Tutor" && <TutorInfo user={props.user} credentials={credentials} setCredentials={setCredentials} updateProfile={props.updateProfile} />}
                    {baseInfo && props.user.credentials.role === "Student" && <StudentInfo user={props.user} setCredentials={setCredentials} credentials={credentials} updateProfile={props.updateProfile} />}
                </div>
            </div>
            </Card>
        </div>
    )
}

export default Profile;