//initial state pass krni hoti hy redux mei
import { GET_ALL_IP_FILTERS_SUCCESS, GET_CATEGORIES_SUCCESS, GET_CITIES_SUCCESS , GET_CLAIMS_SUCCESS, GET_FAQS, GET_FAQS_SUCCESS, GET_TECHNOLOGIES_SUCCESS } from "../../constants/actions"

export default (state = {cities: [] , technologies: [] , ipFilters: [], claims: [] , categories: [] , faqs: []}, { type, payload }) => {
  switch (type) {
    case GET_CITIES_SUCCESS: 
      return { ...state , cities: payload}
    case GET_TECHNOLOGIES_SUCCESS:
      return {...state , technologies: payload}
    case GET_CLAIMS_SUCCESS:
      return {...state , claims: payload}
    case GET_CATEGORIES_SUCCESS: 
      return {...state , categories: payload}
    case GET_FAQS_SUCCESS:
      return {...state , faqs: payload}
    case GET_ALL_IP_FILTERS_SUCCESS:
      return {...state , ipFilters: payload}
    default:
      return state
  }
}
