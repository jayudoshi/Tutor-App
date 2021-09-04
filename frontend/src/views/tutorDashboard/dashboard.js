import React from 'react';

import Stats from '../../components/Dashboard/Stats/stats';
import Courses from '../../components/Dashboard/Course/courses'
import ToDoListApp from '../../components/Dashboard/ToDoList/todolist';
import Header from '../../components/Dashboard/Header/header';

function DashBoard(props){

    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view="Dashboard" toggle={props.toggle} setToggle={props.setToggle}/>
            <Stats courses={props.courses} />
            <Courses courses={props.courses}/>
            <ToDoListApp />
        </div>
    )
}

export default DashBoard;