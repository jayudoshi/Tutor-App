import React , { useEffect, useState } from 'react';
import Main from './main'
import { baseUrl } from '../../config';

function App(props){

    const [view , setView ] = useState(localStorage.getItem('view') || "Dashboard");
    const [toggle , setToggle] = useState(false);
    const [invites , setInvites] = useState(null);
    const [courses , setCourses] = useState(null);

    useEffect(() => {
        if(!invites){
            fetch(baseUrl + "/invites" , {
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
                    setInvites([...resp.invites])
                }
            })
        }
        if(!courses){
            fetch(baseUrl + "/courses" , {
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
                    setCourses(resp.courses)
                }
            })
        }

    } , [])

    return(
        <Main view={view} setView={setView} 
        toggle={toggle} setToggle={setToggle} 
        invites={invites} setInvites={setInvites} 
        courses={courses} setCourses={setCourses}
        user={props.user} logoutUser={props.logoutUser}
        updateUser={props.updateUser} 
        id={props.id}>
        </Main>
    )
}

export default App