import * as ActionTypes from './ActionTypes';

export const User = (state ={
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    credentials: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
} , action) => {
    switch(action.type){
        case ActionTypes.LOGIN_USER:
            return ({
                ...state,
                isAuthenticated: true,
                credentials: action.payload.user,
                token: action.payload.token
            })
        case ActionTypes.UPDATE_PROFILE:
            return({
                ...state,
                credentials: action.payload.user,
            })
        case ActionTypes.LOGOUT:
            return({
                ...state,
                isAuthenticated: false,
                credentials: null,
                token: ''
            })
        case ActionTypes.UPDATE_USER:
            return ({
                ...state,
                credentials: action.payload
            })
        default:
            return state
    }
}