import * as ActionTypes from './ActionTypes';

export const Courses = (state ={
    courses: []
} , action) => {
    switch(action.type){
        case ActionTypes.FETCH_COURSES:
            return ({
                ...state,
                courses: action.payload
            })
        default:
            return state
    }
}