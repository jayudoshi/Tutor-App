import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {User} from './user'
import {Courses} from './courses'

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            courses: Courses,
        }),
        applyMiddleware(thunk,logger),
    )
    return store;
}

export {ConfigureStore};