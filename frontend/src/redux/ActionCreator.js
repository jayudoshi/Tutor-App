import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../config';

export const loginUser = (token , user) => (dispatch) => {
    localStorage.setItem('token',JSON.stringify(token))
    localStorage.setItem('user',JSON.stringify(user))
    dispatch(login({token:token , user:user}))
}

export const login = (payload) => ({
    type: ActionTypes.LOGIN_USER,
    payload: payload
})

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('view');
    localStorage.removeItem('courses')
    dispatch(logout())
}

export const logout = () => ({
    type: ActionTypes.LOGOUT
})

export const updateProfile = (user) => (dispatch) => {
    localStorage.removeItem('user');
    localStorage.setItem('user',JSON.stringify(user))
    dispatch(updateprofile({user:user}))
}

export const updateprofile = (payload) => ({
    type: ActionTypes.UPDATE_PROFILE,
    payload: payload
})



export const updateUser = (userUpdate , profileUpdate , role) => (dispatch) => {
    let url="";
    if(role === "Tutor"){
        url = baseUrl + "users/updateProfile/tutor"
    }else if(role === "Student"){
        url = baseUrl + "users/updateProfile/student"
    }
    if(profileUpdate && !userUpdate){
        fetch(url, {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify(profileUpdate)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                dispatch(updateuser(resp.user))
            }
        })
    }
    if(userUpdate && !profileUpdate){
        fetch(baseUrl + "users", {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify(userUpdate)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err)
            }else{
                dispatch(updateuser(resp.user))
            }
        })
    }
    if(profileUpdate && userUpdate){
        fetch(url, {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify(profileUpdate)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.err){
                console.log(resp.err);
            }else{
                fetch(baseUrl + "users", {
                    method:"PUT",
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    },
                    body:JSON.stringify(userUpdate)
                })
                .then(response => response.json())
                .then(response => {
                    if(response.err){
                    }else{
                        dispatch(updateuser(response.user))
                    }
                })
            }
        })
    }
}

export const updateuser = (user) => ({
    type: ActionTypes.UPDATE_USER,
    payload: user
})

export const fetchCourses = () => (dispatch) => {
    fetch(baseUrl + "courses", {
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
            dispatch(fetchCourses(resp.courses))
        }
    })
}

export const fetchcourses = (courses) => ({
    type: ActionTypes.FETCH_COURSES,
    payload: courses
})