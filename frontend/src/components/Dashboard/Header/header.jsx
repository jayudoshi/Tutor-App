import React from 'react';
import ViewListIcon from '@material-ui/icons/ViewList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header(props){

    function handleClick(){
        props.logoutUser()
    }

    function handleToggle(){
        props.setToggle(true)
    }

    return (
        <div className="w-100 mb-3" style={{height:"10%" , color:"#9A9A9A"}}>
            <div className="navbar-toggle-icon" onClick={handleToggle}>
                <ViewListIcon className="navbar-toggle-button" style={{fontSize:"3rem"}} />
            </div>
            <div className="navbar-toggle-header" style={{display:"inline-block"}}>
                <h1 className="align-middle" style={{display:"inline-block" , fontSize:"2.3rem" , marginTop:"auto" , marginBottom:"auto"}}>{props.view}</h1>
            </div>
            <div className="logout" style={{display:"inline-block" , textAlign:"right"}}>
                <button className="logout-btn" onClick={handleClick}>
                    <span className="align-middle" style={{fontSize:"2.3rem"}}>Logout</span> <ExitToAppIcon className="logout-btn" style={{fontSize:"3rem" , display:"inline-block"}}/>
                </button>
            </div>
            <hr className="p-0 m-0" style={{clear:"left"}}></hr>
        </div>
    )
}

export default Header;