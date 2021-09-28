import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
// import { ADMIN_LOGOUT } from '../constants'
import { epics } from './epics'
import appReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const epicMiddleware = createEpicMiddleware()

const rootReducer = (state, action) => {
  // if (action.type === ADMIN_LOGOUT) {
  //   state = undefined;
  // }
  return appReducer(state, action);
};

const logger = createLogger({
  collapsed: true,
})

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(epicMiddleware, logger))
)

epicMiddleware.run(epics)
//epic is the observable that is used for calling api!

export default store