import React from 'react';
import Header from '../../components/Dashboard/Header/header';
import AllInvites from '../../components/Dashboard/Invites/allInvites';

import { Row , Container } from "reactstrap";

function Invites(props){

    return(
        <div className="col h-100 p-4 overflow-auto" style={{backgroundColor:"#F7F7F8"}} >
          <Header logoutUser={props.logoutUser} view="Invites" toggle={props.toggle} setToggle={props.setToggle}/>
          <Container class="accordion" id="accordionExample">
            {props.courses && props.courses.map((course,index) => {
              return (
                <Row key={course._id} className="mb-3 dashview">
                  <div className="accordion-item p-2" style={{borderRadius:"15px"}}>
                    <h2 class="accordion-header" id={'h' + course._id}>
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#c" + course._id} aria-expanded="true" aria-controls={"c" + course._id}>
                        {course.name}
                      </button>
                    </h2>
                    {index === 0 && <div  id={"c" + course._id} class={"accordion-collapse collapse show"} aria-labelledby={'h' + course._id} data-bs-parent="#accordionExample">
                      <div class="accordion-body pt-0">
                        <AllInvites courses={props.courses} setCourses={props.setCourses} course={course} setCourse={props.setCourse}/>
                      </div>
                    </div>}
                    {index !== 0 && <div  id={"c" + course._id} class={"accordion-collapse collapse"} aria-labelledby={'h' + course._id} data-bs-parent="#accordionExample">
                      <div class="accordion-body pt-0">
                        <AllInvites courses={props.courses} setCourses={props.setCourses} course={course} setCourse={props.setCourse}/>
                      </div>
                    </div>}
                  </div>
                </Row>
              )
            })}
          </Container>
        </div>
    )
}

export default Invites;