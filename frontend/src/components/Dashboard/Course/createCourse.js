import { FormControl, FormGroup, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Col, Form, FormFeedback, Input, Label } from 'reactstrap';
import { baseUrl } from '../../../config';

function CreateCourse(props){

    const [create , setCreate] = useState(false)
    const [disabled,setDisabled] = useState(true)
    const [course , setCourse] = useState({
        name:"",
        grade:"",
        board:"",
        subject:"",
        language:"",
        mode:"",
        timings:"",
        fees:"",
        about:"",
        tutor: props.user.credentials._id,
        invites: [],
        students: [],
        level: "",
        file:""
    });

    const [file,setFile] = useState(null)
    
    const [name , setName] = useState({
        focus: false,
        err: "",
        valid: null
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
    });
    const [subject , setSubject] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [language , setLanguage] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [mode , setMode] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [timings , setTimings] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [fees , setFees] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [about , setAbout] = useState({
        focus: false,
        err: "",
        valid: null
    });
    const [level , setLevel] = useState({
        focus: false,
        err: "",
        valid: null
    });

    function handleChange(event){
        if(event.target.name === 'file'){
            setFile(event.target.files[0])
        }
        setCourse(prevState => ({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    function handleFocus(event){
        if(event.target.name === "name"){
            setName(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "fees"){
            setFees(prevState => ({
                ...prevState,
                focus: true
            }))
        }else if(event.target.name === "about"){
            setAbout(prevState => ({
                ...prevState,
                focus: true
            }))
        }
    }

    function ValidateGrade(){
        if(grade.focus){
            if(course.grade === "" ){
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
            if(course.board === "" ){
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

    function ValidateSubject(){
        if(subject.focus){
            if(course.subject === "" ){
                setSubject(prevState => ({
                ...prevState,
                err: "Select Subject!!",
                valid: false
                }))
            }else{
                setSubject(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateLanguage(){
        if(language.focus){
            if(course.language === "" ){
                setLanguage(prevState => ({
                ...prevState,
                err: "Select Language!!",
                valid: false
                }))
            }else{
                setLanguage(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateMode(){
        if(mode.focus){
            if(course.mode === "" ){
                setMode(prevState => ({
                ...prevState,
                err: "Select Mode!!",
                valid: false
                }))
            }else{
                setMode(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateLevel(){
        if(level.focus){
            if(course.level === "" ){
                setLevel(prevState => ({
                ...prevState,
                err: "Select Level!!",
                valid: false
                }))
            }else{
                setLevel(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function ValidateTimings(){
        if(timings.focus){
            if(course.timings === "" ){
                setTimings(prevState => ({
                ...prevState,
                err: "Select Timings!!",
                valid: false
                }))
            }else{
                setTimings(prevState => ({
                ...prevState,
                err:"",
                valid: true
                }))
            }
        }
    }

    function Validate(event){
        if(event.target.name === "name"){
            if(name.focus){
                if(course.name === "" ){
                    setName(prevState => ({
                    ...prevState,
                    err: "Name can't be empty!!",
                    valid: false
                    }))
                }else{
                    setName(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "fees"){
            if(fees.focus){
                if(course.fees === "" ){
                    setFees(prevState => ({
                    ...prevState,
                    err: "Fees can't be empty!!",
                    valid: false
                    }))
                }else{
                    setFees(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }else if(event.target.name === "about"){
            if(about.focus){
                if(course.about === "" ){
                    setAbout(prevState => ({
                    ...prevState,
                    err: "About can't be empty!!",
                    valid: false
                    }))
                }else{
                    setAbout(prevState => ({
                    ...prevState,
                    err:"",
                    valid: true
                    }))
                }
            }
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('name',course.name)
        formData.append('grade',course.grade)
        formData.append('board',course.board)
        formData.append('subject',course.subject)
        formData.append('language',course.language)
        formData.append('timings',course.timings)
        formData.append('mode',course.mode)
        formData.append('fees',course.fees)
        formData.append('about',course.about)
        formData.append('tutor',course.tutor)
        formData.append('invites',course.invites)
        formData.append('students',course.students)
        formData.append('level',course.level)
        formData.append('file',file)

        // setDisabled(true);
        fetch(baseUrl + "/courses" , {
            method:"POST",
            headers: {
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body: formData
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                setCourse(prevState => ({
                    ...prevState,
                    name:"",
                    grade:"",
                    board:"",
                    subject:"",
                    language:"",
                    mode:"",
                    timings:"",
                    fees:"",
                    about:"",
                    level:""
                }))
                setName({focus: false,err: "",valid: null})
                setGrade({focus: false,err: "",valid: null})
                setBoard({focus: false,err: "",valid: null})
                setSubject({focus: false,err: "",valid: null})
                setLanguage({focus: false,err: "",valid: null})
                setMode({focus: false,err: "",valid: null})
                setTimings({focus: false,err: "",valid: null})
                setFees({focus: false,err: "",valid: null})
                setAbout({focus: false,err: "",valid: null})
                setLevel({focus: false,err: "",valid: null})
                setFile(null)
                props.setCourses(prevState => [resp.course , ...prevState])
                setCreate(false)
                setDisabled(true)
            }
        })
    }

    return(
        <Col>
            <Card className="dashview p-3">
                <CardTitle tag="h3" className="footer-text m-0">Create a Course</CardTitle>
                <CardBody style={{paddingTop:"0px"}}>
                    <Form onSubmit={handleSubmit} style={{color:"#9A9A9A"}} enctype="multipart/form-data">
                    <FormGroup className="mt-3" >
                        <div className="row">
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Class</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="class">Class</InputLabel>
                                        <Select
                                        labelId="class"
                                        id="Class"
                                        name="grade"
                                        value= {course.grade}
                                        onChange={handleChange}
                                        onFocus={() => {setGrade(prevState => ({...prevState , focus:true})) ; ValidateGrade()}}
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
                            </div>
                            <div className="col-6">
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Board</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="board">Select Board</InputLabel>
                                        <Select
                                        labelId="board"
                                        id="Board"
                                        name="board"
                                        value={course.board}
                                        onChange={handleChange}
                                        onFocus={() => {setBoard(prevState => ({...prevState , focus:true})) ; ValidateBoard()}}
                                        >
                                        <MenuItem value="State Board">State Board</MenuItem>
                                        <MenuItem value="ICSE">ICSE</MenuItem>
                                        <MenuItem value="CBSE">CBSE</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormFeedback style={{color:"red" , display:"block"}}>{board.err}</FormFeedback>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <div className="row">
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Subject</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="subject">Subject</InputLabel>
                                        <Select
                                        labelId="subject"
                                        id="Subject"
                                        name="subject"
                                        value={course.subject}
                                        onChange={handleChange}
                                        onFocus={() => {setSubject(prevState => ({...prevState , focus:true})) ; ValidateSubject()}}
                                        >
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Maths">Maths</MenuItem>
                                        <MenuItem value="Phsyics">Phsyics</MenuItem>
                                        <MenuItem value="Chemistry">Chemistry</MenuItem>
                                        <MenuItem value="Marathi">Marathi</MenuItem>
                                        <MenuItem value="Gujrati">Gujrati</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormFeedback style={{color:"red" , display:"block"}}>{subject.err}</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Language</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="language">Language</InputLabel>
                                        <Select
                                        labelId="language"
                                        id="Language"
                                        name="language"
                                        value={course.language}
                                        onChange={handleChange}
                                        onFocus={() => {setLanguage(prevState => ({...prevState , focus:true})) ; ValidateLanguage()}}
                                        >
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Hindi">Hindi</MenuItem>
                                        <MenuItem value="Both">Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormFeedback style={{color:"red" , display:"block"}}>{language.err}</FormFeedback>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-3" >
                        <div className="row">
                        <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Mode of Teaching</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="mode">Mode</InputLabel>
                                        <Select
                                        labelId="mode"
                                        id="Mode"
                                        name="mode"
                                        value={course.mode}
                                        onChange={handleChange}
                                        onFocus={() => {setMode(prevState => ({...prevState , focus:true})) ; ValidateMode()}}
                                        >
                                        <MenuItem value="Online">Online</MenuItem>
                                        <MenuItem value="Offline">Offline</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormFeedback style={{color:"red" , display:"block"}}>{mode.err}</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Preferred Timings</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="timings">Preferred Timings</InputLabel>
                                        <Select
                                        labelId="timings"
                                        id="Timings"
                                        name="timings"
                                        value={course.timings}
                                        onChange={handleChange}
                                        onFocus={() => {setTimings(prevState => ({...prevState , focus:true})) ; ValidateTimings()}}
                                        >
                                        <MenuItem value="Morning">Morning</MenuItem>
                                        <MenuItem value="Afternoon">Afternoon</MenuItem>
                                        <MenuItem value="Evening">Evening</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormFeedback style={{color:"red" , display:"block"}}>{timings.err}</FormFeedback>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-0">
                        <div className="row">
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Level</Label>
                                    <FormControl disabled={disabled} style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="board">Select Level</InputLabel>
                                        <Select
                                        labelId="level"
                                        id="Level"
                                        name="level"
                                        value={course.level}
                                        onChange={handleChange}
                                        onFocus={() => {setLevel(prevState => ({...prevState , focus:true})) ; ValidateLevel()}}
                                        >
                                        <MenuItem value="Beginner">Beginner</MenuItem>
                                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                                        <MenuItem value="Advance">Advance</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormFeedback style={{color:"red" , display:"block"}}>{level.err}</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Fees <small>(Per Month)</small></Label>
                                    <Input style={{color:"#9A9A9A" , borderRadius:"0px" , fontSize:"1.25rem" , borderColor:"lightgrey" , borderTop:"0" , borderLeft:"0" , borderRight:"0"}} 
                                        className="col input-field p-0 mt-3" bssize="lg" type="number" 
                                        name="fees" placeholder="(in rupees)" autoComplete='off' value={course.fees}
                                        onWheel={ event => event.currentTarget.blur()}
                                        onChange={handleChange} onBlur={Validate} onFocus={handleFocus} disabled={disabled}
                                    />
                                    <FormFeedback style={{color:"red" , display:"block"}}>{fees.err}</FormFeedback>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-0">
                        <div className="row">
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Course Name</Label>
                                    <Input style={{color:"#9A9A9A" , borderRadius:"0px" , fontSize:"1.25rem" , borderColor:"lightgrey" , borderTop:"0" , borderLeft:"0" , borderRight:"0"}} 
                                        className="col input-field p-0 mt-3" bssize="lg" type="text" 
                                        name="name" placeholder="Course Name" autoComplete='off' value={course.name}
                                        onChange={handleChange} onBlur={Validate} onFocus={handleFocus} disabled={disabled}
                                    />
                                    <FormFeedback style={{color:"red" , display:"block"}}>{name.err}</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Image</Label>
                                    <Input style={{color:"#9A9A9A" , borderRadius:"0px" , fontSize:"1.25rem" , borderColor:"lightgrey" , borderTop:"0" , borderLeft:"0" , borderRight:"0"}} 
                                        className="col input-field p-0 mt-3" bssize="lg" type="file" 
                                        name="file" autoComplete='off' value={course.file}
                                        onChange={handleChange} disabled={disabled}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label className="p-0 mb-2" size="lg">About Course</Label>
                        <Input type="textarea" rows="3" className="col-12" bssize="lg" name="about" value={course.about}
                        style={{color:"#9A9A9A" ,fontSize:"1.25rem",resize:"none" , backgroundColor:"transparent"}} placeholder="About Course..."
                        onChange={handleChange} onBlur={Validate} onFocus={handleFocus} disabled={disabled}
                        />
                        <FormFeedback style={{color:"red" , display:"block"}}>{about.err}</FormFeedback>
                    </FormGroup>
                    {!create && <div>
                        <button className="btn btn-lg btn-block btn-outline-dark mt-3" style={{display:"block" , width:"100%"}}
                            onClick={() => {setCreate(true) ; setDisabled(false)}}
                        >
                            Create Course
                        </button>
                    </div>}
                    {create && <div>
                        <button type="submit" className="btn btn-lg btn-block btn-outline-dark mt-3" style={{display:"block" , width:"100%"}}
                            disabled={!name.valid || !grade.valid || !board.valid || !subject.valid || !language.valid || !mode.valid || !timings.valid || !fees.valid || !about.valid || disabled}
                        >
                            Save
                        </button>
                    </div>}
                    </Form>
                </CardBody>
            </Card>
        </Col>
    )
}

export default CreateCourse;