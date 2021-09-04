import React from 'react';
import { Redirect } from 'react-router-dom';

import PhoneInfo from '../components/Profile/phoneInfo';

import { Card } from 'reactstrap'

import LockIcon from '@material-ui/icons/Lock';

function PhoneVerify(props){
    return (
    <div className="App container-fluid h-100" style={{backgroundColor:"#E2E7EC"}}>
            {props.user && props.user.isAuthenticated && <Redirect to="/dashboard" />}
            <Card className="container chatWindow" style={{overflowY:"auto" , overflowX:"hidden"}}>
            <div className="row h-100">
                <div className="col form-container m-auto">
                <div className="">
                    <h1 className="text-center" ><LockIcon fontSize='large' /></h1>
                    <h1 className="text-center">Sign Up</h1>
                    <PhoneInfo />
                </div>
                </div>
            </div>
            </Card>
        </div>
    )
}

export default PhoneVerify;