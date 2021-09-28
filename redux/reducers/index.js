import { combineReducers } from 'redux'
import genericDataReducer from './genericDataReducer'
import sessionReducer from './sessionReducer'
import casesReducer from './casesReducer'
import notificatonsReducer from './notificatonsReducer'

export default combineReducers({
    genericDataReducer,
    sessionReducer,
    casesReducer,
    notificatonsReducer
})
