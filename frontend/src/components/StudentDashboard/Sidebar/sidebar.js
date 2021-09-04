import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assests/img/logo.png';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import BookIcon from '@material-ui/icons/Book';

function Sidebar(props){
  return (
    <div className="col my-sidebar h-100">
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
              <li class="nav-item sidebar-link m-2 p-2" >
                  <DashboardIcon style={{display:"inline" , marginLeft:"15px"}}/>
                  <Link class="nav-link active" href="#" style={{display:"inline"}}>Dashboard</Link>
              </li>
              <li class="nav-item sidebar-link m-2 p-2" >
                  <PersonIcon style={{display:"inline" , marginLeft:"15px"}}/>
                  <Link class="nav-link" href="#" style={{display:"inline"}}>Profile</Link>
              </li>
              <li class="nav-item sidebar-link m-2 p-2" >
                  <BookIcon style={{display:"inline" , marginLeft:"15px"}}/>
                  <Link class="nav-link" href="#" style={{display:"inline"}}>Courses</Link>
              </li>
              <li class="nav-item sidebar-link m-2 p-2" >
                  <SchoolIcon style={{display:"inline" , marginLeft:"15px"}}/>
                  <Link class="nav-link" href="#" style={{display:"inline"}}>Students</Link>
              </li>
              <li class="nav-item sidebar-link m-2 p-2" >
                  <NotificationsActiveIcon style={{display:"inline" , marginLeft:"15px"}}/>
                  <Link class="nav-link" href="#" style={{display:"inline"}}>Invites</Link>
              </li>
          </ul>
      </div>
    </div>
  )
}

export default Sidebar;