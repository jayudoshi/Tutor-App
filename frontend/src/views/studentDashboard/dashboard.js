import React, { useState } from 'react';

import Stats from '../../components/StudentDashboard/Stats/stats';
import Courses from '../../components/StudentDashboard/Course/courses'
import ToDoListApp from '../../components/StudentDashboard/ToDoList/todolist';
import Header from '../../components/Dashboard/Header/header';

function Dashboard(props){
    
    const [taskNumber , setTaskNumber] = useState(0)

    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}}>
            <Header logoutUser={props.logoutUser} view="Dashboard" toggle={props.toggle} setToggle={props.setToggle}/>
            <Stats courses={props.courses} taskNumber={taskNumber} invites={props.invites}/>
            <Courses courses={props.courses}/>
            <ToDoListApp setTaskNumber={setTaskNumber}/>
        </div>
    )
}

export default Dashboard