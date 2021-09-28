//initial state pass krni hoti hy redux mei
import { LOGIN, SEND_OTP_SUCCESS,LOGIN_FAILURE,SEND_OTP_FAILURE,VALIDATE_OTP, REFRESH_TOKEN, REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_SUCCESS, SET_SESSION } from "../../constants/actions"

export default (state = { loading: false, session: {}, refreshingToken: false, sessionExpired: false }, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, loading: true }
    case SEND_OTP_SUCCESS:
      return { ...state, loading: false }
    case LOGIN_FAILURE:
      return { ...state, loading: false }
    case SEND_OTP_FAILURE:
      return { ...state, loading: false }
      case VALIDATE_OTP:
      return { ...state, loading: true }
    case SET_SESSION:
      return { ...state, sessionExpired: false, session: payload , loading: false}
    case REFRESH_TOKEN:
      return { ...state, refreshingToken: true }
    case REFRESH_TOKEN_SUCCESS:
      return { ...state, refreshingToken: false }
    case REFRESH_TOKEN_FAILURE:
      return { ...state, sessionExpired: true, refreshingToken: false }
    default:
      return state
  }
}
