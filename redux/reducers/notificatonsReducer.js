//initial state pass krni hoti hy redux mei
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_SUCCESS } from "../../constants/actions"

export default (state = { loading: false, notifications: [] }, { type, payload }) => {
  switch (type) {
    case GET_NOTIFICATIONS:
      return { ...state, loading: true }
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, loading: false, notifications: payload }
    case GET_NOTIFICATIONS:
      return { ...state, loading: false }
    default:
      return state
  }
}
