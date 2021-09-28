import { switchMap , filter } from 'rxjs/operators'
import { customisedAction } from '../actions'
import { generalizedEpic } from './generalizedEpic'
import {
  GET_ALL_GENERIC_DATA,
  GET_ALL_IP_FILTERS,
  GET_ALL_IP_FILTERS_FAILURE,
  GET_ALL_IP_FILTERS_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
  GET_CITIES,
  GET_CITIES_FAILURE,
  GET_CITIES_SUCCESS,
  GET_CLAIMS,
  GET_CLAIMS_FAILURE,
  GET_CLAIMS_SUCCESS,
  GET_FAQS,
  GET_FAQS_FAILURE,
  GET_FAQS_SUCCESS,
  GET_TECHNOLOGIES,
  GET_TECHNOLOGIES_FAILURE,
  GET_TECHNOLOGIES_SUCCESS,
} from '../../constants/actions'
import { END_POINTS } from '../../constants/apis'

export class genericDataEpic {
  static getCities = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_GENERIC_DATA:
            return true;
          case GET_CITIES:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',  //define method
            END_POINTS.getCities, //endpoint
            null , //data pass obj bna k mtlb {}
            (resObj) => { //callback
              const cities = resObj.map( (m) => {
                return {
                  key: m.id , label: m.name
                }
              } )
              return customisedAction(GET_CITIES_SUCCESS, cities)
            },
            GET_CITIES_FAILURE
          )
        }
      )
    )
    static getFaqs = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_GENERIC_DATA:
            return true;
          case GET_FAQS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',  //define method
            END_POINTS.getFaqs, //endpoint
            null , //data pass obj bna k mtlb {}
            (resObj) => { //callback
              const faqs = resObj.map( (m) => {
                return {
                  question: m.question , answer: m.answer
                }
              } )
              return customisedAction(GET_FAQS_SUCCESS, faqs)
            },
            GET_FAQS_FAILURE
          )
        }
      )
    )
    static getCategories = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_GENERIC_DATA:
            return true;
          case GET_CATEGORIES:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',  //define method
            END_POINTS.getCategories, //endpoint
            null , //data pass obj bna k mtlb {}
            (resObj) => { //callback
              const categories = resObj.map( (m) => {
                return {
                  key: m.id , label: m.name
                }
              } )
              return customisedAction(GET_CATEGORIES_SUCCESS, categories)
            },
           GET_CATEGORIES_FAILURE
          )
        }
      )
    )
    static getClaims = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_GENERIC_DATA:
            return true;
          case GET_CLAIMS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',  //define method
            END_POINTS.getClaims, //endpoint
            null , //data pass obj bna k mtlb {}
            (resObj) => { //callback
              const claims = resObj.map( (m) => {
                return {
                  key: m.id , label: m.description
                }
              } )
              return customisedAction(GET_CLAIMS_SUCCESS, claims)
            },
            GET_CLAIMS_FAILURE
          )
        }
      )
    )
    static getTechnologies = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_GENERIC_DATA:
            return true;
          case GET_TECHNOLOGIES:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',  
            END_POINTS.getTechnology,
            null , 
            (resObj) => { 
              const technologies = resObj.map( (m) => {
                return {
                  key: m.id , label: m.name
                }
              } )
              return customisedAction(GET_TECHNOLOGIES_SUCCESS, technologies)
            },
            GET_TECHNOLOGIES_FAILURE
          )
        }
      )
    )
    static getAllIpFilters = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_ALL_GENERIC_DATA:
            return true;
          case GET_ALL_IP_FILTERS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async () => {
          return generalizedEpic(
            'get',  
            END_POINTS.getAllIpFilters,
            null , 
            (resObj) => { 
              const ipFilters = resObj.map( (m) => {
                return {
                  key: m.id , label: m.name
                }
              } )
              return customisedAction(GET_ALL_IP_FILTERS_SUCCESS, ipFilters)
            },
            GET_ALL_IP_FILTERS_FAILURE
          )
        }
      )
    )
}
