//initial state pass krni hoti hy redux mei
import { ADD_CASE, ADD_CASE_FAILURE, ADD_CASE_SUCCESS, PAYMENT, PAYMENT_FAILURE, PAYMENT_SUCCESS, USER_CASE_SUCCESS } from "../../constants/actions"

export default (state = { loading: false, cases: [] }, { type, payload }) => {
  switch (type) {
    case ADD_CASE:
      return { ...state, loading: true }
    case ADD_CASE_SUCCESS:
      return { ...state, loading: false }
    case ADD_CASE_FAILURE:
      return { ...state, loading: true }
    case PAYMENT:
      return { ...state, loading: true }
    case PAYMENT_SUCCESS:
      return { ...state, loading: false }
    case PAYMENT_FAILURE:
      return { ...state, loading: false }
    case USER_CASE_SUCCESS:
      return { ...state, cases: payload }

    default:
      return state
  }
}
