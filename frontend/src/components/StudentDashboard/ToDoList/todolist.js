import React, { useEffect, useState } from 'react';
import {
    Card,
    Table,
    Row,
    Col,
    Form,
  } from "react-bootstrap";
import { CardBody, CardHeader, CardTitle } from 'reactstrap';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import { baseUrl } from '../../../config';

function ToDoListApp(props){

    const [tasks , setTasks] = useState(null);
    
    const [task , setTask] = useState("");

    useEffect(() => {
        if(!tasks){
            fetch(baseUrl + "/tasks" , {
                method:"GET",
                headers:{
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
            })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.err){
                    console.log(resp.err)
                }else{
                    setTasks(resp.task.tasks)
                    let tasks = resp.task.tasks.filter(task => !task.status)
                    props.setTaskNumber(tasks.length)
                }
            })
        }
    } , [])

    function handleClick(event){
        event.preventDefault();
        fetch(baseUrl + "/tasks" , {
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify({task:task})
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                if(resp.task){
                    if(resp.task.tasks !== null){
                        setTasks(resp.task.tasks)
                        setTask('')
                    }
                    props.setTaskNumber(prevState => {
                        let no = prevState;
                        return no + 1
                    })
                }
            }
        })
    }

    const handleDone = (task,index) => {
        task.status = !task.status
        if(task.status === false){
            props.setTaskNumber(prevState => {
                let no = prevState;
                return no + 1
            })
        }
        if(task.status === true){
            props.setTaskNumber(prevState => {
                let no = prevState;
                return no - 1
            })
        }
        setTasks(prevState => {
            prevState[index] = task
            return [...prevState]
        })
        fetch(baseUrl + "/tasks/" + task._id , {
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify({status:task.status})
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }
        })
    }

    const handleDelete = (task) => {
        if(task.status === false){
            props.setTaskNumber(prevState => {
                let no = prevState;
                return no - 1
            })
        }
        setTasks(prevState => {
            prevState = prevState.filter(Task => Task._id !== task._id)
            return [...prevState]
        })
        fetch(baseUrl + "/tasks/" + task._id , {
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }
        })
    }

    const renderTasks = () => {
        if(!tasks){
            return
        }
        return tasks.map( (task,index) => {
            return (
            <tr key={index}>
                <td style={{width:"10px"}}>
                    <Form.Check className="mb-1 pl-0">
                        <Form.Check.Label>
                        <Form.Check.Input
                            className="todolist-check-btn todolist-btn"
                            style={{color:"black"}}
                            checked={task.status}
                            defaultValue=""
                            type="checkbox"
                            onClick = {() => handleDone(task,index)}
                        ></Form.Check.Input>
                        <span className="form-check-sign"></span>
                        </Form.Check.Label>
                    </Form.Check>
                </td>
                <td>
                    {task.task}
                </td>
                <td style={{width:"80px" , paddingRight:"0px" , textAlign:"right"}}>
                    <CancelIcon className='todolist-btn' style={{marginRight:"25px"}} onClick={() => handleDelete(task)}/>
                </td>
            </tr>
            )
        })
    }

    return(
        <Row className="mt-3">
            <Col>
                <Card className="dashview">
                    <CardHeader className="table-header">
                        <CardTitle tag="h3" className="footer-text">My Tasks</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <tbody>
                                <tr>
                                    <td colspan="2">        
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control style={{borderTop:"0px" , borderLeft:"0px" , borderRight:"0px"}} type="text" placeholder="Enter Your Task..." value={task} onChange={(e) => {setTask(e.target.value)}} />
                                        </Form.Group>
                                    </td>
                                    <td className="text-center" colspan="2">
                                        <button style={{backgroundColor:"transparent" , border:"0px"}}
                                            onClick={handleClick}
                                        >
                                            <DoneIcon/>
                                        </button>
                                    </td>
                                </tr>
                                {renderTasks()}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default ToDoListApp;