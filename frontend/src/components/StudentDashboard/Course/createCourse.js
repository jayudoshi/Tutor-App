import { FormControl, FormGroup, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Col, Input, Label } from 'reactstrap';

function CreateCourse(props){

    const [age , setAge] = useState("")

    return(
        <Col>
            <Card className="dashview p-3">
                <CardTitle tag="h3" className="footer-text m-0">Create a Course</CardTitle>
                <CardBody style={{paddingTop:"0px"}}>
                    <FormGroup className="mt-3" >
                        <div className="row">
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Class</Label>
                                    <FormControl style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={(e) => {setAge(e.target.value)}}
                                        >
                                        <MenuItem value="online">1st</MenuItem>
                                        <MenuItem value="online">2nd</MenuItem>
                                        <MenuItem value="online">3rd</MenuItem>
                                        <MenuItem value="online">4th</MenuItem>
                                        <MenuItem value="online">5th</MenuItem>
                                        <MenuItem value="online">6th</MenuItem>
                                        <MenuItem value="online">7th</MenuItem>
                                        <MenuItem value="online">8th</MenuItem>
                                        <MenuItem value="online">9th</MenuItem>
                                        <MenuItem value="online">10th</MenuItem>
                                        <MenuItem value="online">11th</MenuItem>
                                        <MenuItem value="online">12th</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Board</Label>
                                    <FormControl style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="demo-simple-select-label">Select Board</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={(e) => {setAge(e.target.value)}}
                                        >
                                        <MenuItem value="Pursuing">State Board</MenuItem>
                                        <MenuItem value="Completed">ICSE</MenuItem>
                                        <MenuItem value="Completed">CBSE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <div className="row">
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Subject</Label>
                                    <FormControl style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={(e) => {setAge(e.target.value)}}
                                        >
                                        <MenuItem value="Pursuing">English</MenuItem>
                                        <MenuItem value="Completed">Maths</MenuItem>
                                        <MenuItem value="Completed">Phsyics</MenuItem>
                                        <MenuItem value="Completed">English</MenuItem>
                                        <MenuItem value="Completed">Marathi</MenuItem>
                                        <MenuItem value="Completed">Gujrati</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Language</Label>
                                    <FormControl style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={(e) => {setAge(e.target.value)}}
                                        >
                                        <MenuItem value="Pursuing">English</MenuItem>
                                        <MenuItem value="Completed">Hindi</MenuItem>
                                        <MenuItem value="Completed">Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-3" >
                        <div className="row">
                        <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Mode of Teaching</Label>
                                    <FormControl style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={(e) => {setAge(e.target.value)}}
                                        >
                                        <MenuItem value="online">Online</MenuItem>
                                        <MenuItem value="offline">Offline</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <div className="col-6" style={{fontSize:"1.25rem"}}>
                                <FormGroup style={{marginTop:"3px"}}>
                                    <Label className="p-0" size="lg">Preferred Timings</Label>
                                    <FormControl style={{width:"100%" , fontSize:"1.25rem" , color:"#10293C"}}>
                                        <InputLabel id="demo-simple-select-label">Preferred Timings</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={(e) => {setAge(e.target.value)}}
                                        >
                                        <MenuItem value="online">Morning</MenuItem>
                                        <MenuItem value="online">Afternoon</MenuItem>
                                        <MenuItem value="online">Evening</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label className="p-0" size="lg">Fees <small>(Per Month)</small></Label>
                        <Input style={{borderRadius:"0px" , borderColor:"lightgrey"}} className="col input-field" bsSize="lg" type="text" 
                            name="username" placeholder="Fees(Per Month)" autoComplete='off' 
                        />
                    </FormGroup>
                    <div>
                        <button className="btn btn-lg btn-block btn-outline-dark mt-3" style={{display:"block" , width:"100%"}}>Create Course</button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default CreateCourse;