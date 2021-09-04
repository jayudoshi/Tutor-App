import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../config';
import Main from './main'

function App(props){
    const [view , setView ] = useState(localStorage.getItem('view') || "Dashboard");
    const [toggle , setToggle] = useState(false);
    const [courses , setCourses] = useState(null);
    const [course , setCourse] = useState("");

    useEffect(() => {
        if(!courses){
            fetch(baseUrl + "/courses", {
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
            })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.err){
                    console.log(resp.err)
                }else{
                    setCourses([...resp.courses]);
                }
            })
        }
    } , [])

    return (
        <Main view={view} setView={setView} 
        toggle={toggle} setToggle={setToggle} 
        courses={courses} setCourses={setCourses} 
        course={course} setCourse={setCourse}
        user={props.user} logoutUser={props.logoutUser}
        updateUser={props.updateUser} id={props.id}>
        </Main>
    )
}

export default App;