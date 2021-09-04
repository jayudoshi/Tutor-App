import React, { useState } from 'react';
import { baseUrl } from '../../config';

import { Button, Label, FormGroup, Form, FormFeedback} from 'reactstrap'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const StudentInfo = (props) => {
    
    const[nwErr , setNWErr] = useState(false)
    const [credentials , setCredentials] = useState({
        ...props.credentials,
        grade: "",
        board:"",
        stream:""
    })
    const [grade , setGrade] = useState({
        focus: false,
        err: "",
        valid: null
    })
    const [board , setBoard] = useState({
        focus: false,
        err: "",
        valid: null
    })
    const [stream , setStream] = useState({
        focus: false,
        err: "",
        valid: null
    });

    function handleChange(event){
        setCredentials(prevState => ({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    function handleSubmit(event){
        event.preventDefault();
        fetch(baseUrl + "/users/updateProfile/student" , {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + props.user.token
            },
            body:JSON.stringify(credentials)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                setNWErr(true)
            }else{
                props.updateProfile(resp.user) 
            }
        })
    }

    function ValidateGrade(){
        if(grade.focus){
            if(credentials.grade === "" ){
                setGrade(prevState => ({
                ...prevState,
                err: "Select Grade!!",
                valid: false
                }))
            }else{
                setGrade(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateBoard(){
        if(board.focus){
            if(credentials.board === "" ){
                setBoard(prevState => ({
                ...prevState,
                err: "Select Board!!",
                valid: false
                }))
            }else{
                setBoard(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateStream(){
        if(stream.focus){
            if(credentials.stream === "" ){
                setStream(prevState => ({
                ...prevState,
                err: "Select Stream!!",
                valid: false
                }))
            }else{
                setStream(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    return(
        <Form onSubmit= {handleSubmit} className="p-4" >
            <FormGroup className="mt-3" >
                <Label className="p-0" size="lg">Your Class</Label>
                <FormControl required style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                    <InputLabel id="Class">Select Your Class</InputLabel>
                    <Select
                    name="grade"
                    labelId="Class"
                    id="grade"
                    value={credentials.grade}
                    onChange={handleChange}
                    onFocus={() => {setGrade(prevState => ({...prevState,focus: true})) ; ValidateGrade()}}
                    >
                    <MenuItem value="1st">1st</MenuItem>
                    <MenuItem value="2nd">2nd</MenuItem>
                    <MenuItem value="3rd">3rd</MenuItem>
                    <MenuItem value="4th">4th</MenuItem>
                    <MenuItem value="5th">5th</MenuItem>
                    <MenuItem value="6th">6th</MenuItem>
                    <MenuItem value="7th">7th</MenuItem>
                    <MenuItem value="8th">8th</MenuItem>
                    <MenuItem value="9th">9th</MenuItem>
                    <MenuItem value="10th">10th</MenuItem>
                    <MenuItem value="11th">11th</MenuItem>
                    <MenuItem value="12th">12th</MenuItem>
                    </Select>
                </FormControl>
                <FormFeedback style={{color:"red" , display:"block"}}>{grade.err}</FormFeedback>
            </FormGroup>
            <FormGroup className="mt-3" >
                <Label className="p-0" size="lg">Your Board</Label>
                <FormControl required style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                    <InputLabel id="Board">Select Your Board</InputLabel>
                    <Select
                    name="board"
                    labelId="Board"
                    id="board"
                    value={credentials.board}
                    onChange={handleChange}
                    onFocus={() => {setBoard(prevState => ({...prevState,focus: true})) ; ValidateBoard()}}
                    >
                    <MenuItem value="State Board">State Board</MenuItem>
                    <MenuItem value="ICSE">ICSE</MenuItem>
                    <MenuItem value="CBSE">CBSE</MenuItem>
                    </Select>
                </FormControl>
                <FormFeedback style={{color:"red" , display:"block"}}>{board.err}</FormFeedback>
            </FormGroup>
            <FormGroup className="mt-3" >
                <Label className="p-0" size="lg">Your Stream</Label>
                <FormControl required style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                    <InputLabel id="Stream">Select Your Stream</InputLabel>
                    <Select
                    name="stream"
                    labelId="Stream"
                    id="stream"
                    value={credentials.stream}
                    onChange={handleChange}
                    onFocus={() => {setStream(prevState => ({...prevState,focus: true})) ; ValidateStream()}}
                    >
                    <MenuItem value="PCM">PCM</MenuItem>
                    <MenuItem value="PCB">PCB</MenuItem>
                    <MenuItem value="Commerce">Commerce</MenuItem>
                    <MenuItem value="Arts">Arts</MenuItem>
                    <MenuItem value="School">School</MenuItem>
                    </Select>
                </FormControl>
                <FormFeedback style={{color:"red" , display:"block"}}>{stream.err}</FormFeedback>
            </FormGroup>
            

            <Button className="mt-5 w-100 rounded-pill sign-button" type="submit" size="lg block"
                disabled={!grade.valid || !board.valid || !stream.valid}
            >
                Finish
            </Button>
            {nwErr && <p className="p-0 mb-0 mt-1 text-center" style={{color:"whitesmoke" , fontSize:"1.2rem"}}>Network Err!! Retry in few moments</p>}
        </Form>
    )
}

export default StudentInfo;