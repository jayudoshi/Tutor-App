import React from 'react';
import Header from '../../components/Dashboard/Header/header';

import RequestInvites from '../../components/StudentDashboard/Invites/invites';

function Invites(props){

    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}} >
            <Header logoutUser={props.logoutUser} view="Invites" toggle={props.toggle} setToggle={props.setToggle}/>
            <RequestInvites invites={props.invites}/>
        </div>
    )
}

export default Invites;