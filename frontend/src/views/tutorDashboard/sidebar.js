import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assests/img/logo.png';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import BookIcon from '@material-ui/icons/Book';
import CancelIcon from '@material-ui/icons/Cancel';

function Sidebar(props){
  
    function handleToggle(){
        props.setToggle(false);
    }

    return (
    <div 
        className={props.toggle ? "col my-sidebar display-sidebar h-100 overflow-auto" : "col my-sidebar no-display h-100 overflow-auto"}
    >
      <div className="row p-3">
          <div className="col-2 m-auto p-0">
              <img className="logo" src={logo} alt="Logo" width="100%"/>
          </div>
          <div className="col-10 m-auto">
              <h2 className="p-0 m-auto">Vidyalayan</h2>
          </div>
          <hr className="p-0" style={{marginTop:"10px"}}></hr>
      </div>
      <div className="row">
          <ul class="nav flex-column" style={{padding:"5px 15px 5px 30px"}}>
                <li className={props.view === "Dashboard" ? "nav-item sidebar-link m-2 p-2 sidebar-link-acitve" : "nav-item sidebar-link m-2 p-2"}
                    onClick={() => {handleToggle() ; props.setView("Dashboard") ; localStorage.setItem('view','Dashboard')}}
                >
                    <DashboardIcon style={{display:"inline" , marginLeft:"15px"}}/>
                    <Link className="nav-link" href="#" style={{display:"inline" , color:"inherit"}} onClick={e => e.preventDefault()}>
                        Dashboard
                    </Link>
                </li>
                <li className={props.view === "Profile" ? "nav-item sidebar-link m-2 p-2 sidebar-link-acitve" : "nav-item sidebar-link m-2 p-2"} 
                    onClick={() => {handleToggle() ; props.setView("Profile") ; localStorage.setItem('view','Profile')}}
                >
                    <PersonIcon style={{display:"inline" , marginLeft:"15px"}}/>
                    <Link className="nav-link" href="#" style={{display:"inline" , color:"inherit"}} onClick={e => e.preventDefault()}>
                        Profile
                    </Link>
                </li>
                <li className={props.view === "Courses" || props.view === "CourseDetail" ? "nav-item sidebar-link m-2 p-2 sidebar-link-acitve" : "nav-item sidebar-link m-2 p-2"} 
                    onClick={() => {handleToggle() ; props.setView("Courses") ; localStorage.setItem('view','Courses')}}
                >
                    <BookIcon style={{display:"inline" , marginLeft:"15px"}}/>
                    <Link className="nav-link" href="#" style={{display:"inline" , color:"inherit"}} onClick={e => e.preventDefault()}>
                        Courses
                    </Link>
                </li>
                <li className={props.view === "Students" ? "nav-item sidebar-link m-2 p-2 sidebar-link-acitve" : "nav-item sidebar-link m-2 p-2"} 
                    onClick={() => {handleToggle() ; props.setView("Students") ; localStorage.setItem('view','Students')}}
                >
                    <SchoolIcon style={{display:"inline" , marginLeft:"15px"}}/>
                    <Link className="nav-link" href="#" style={{display:"inline" , color:"inherit"}} onClick={e => e.preventDefault()}>
                        Students
                    </Link>
                </li>
                <li className={props.view === "Invites" ? "nav-item sidebar-link m-2 p-2 sidebar-link-acitve" : "nav-item sidebar-link m-2 p-2"} 
                    onClick={() => {handleToggle() ; props.setView("Invites") ; localStorage.setItem('view','Invites')}}
                >
                    <NotificationsActiveIcon style={{display:"inline" , marginLeft:"15px"}}/>
                    <Link className="nav-link" href="#" style={{display:"inline" , color:"inherit"}} onClick={e => e.preventDefault()}>
                        Invites
                    </Link>
                </li>
          </ul>
      </div>
      <div className="row display-close-icon" style={{color:"whitesmoke"}}>
        <div className="col-12 text-center" onClick={handleToggle}>
            <CancelIcon className="close-icon" style={{fontSize:"2rem"}}/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;