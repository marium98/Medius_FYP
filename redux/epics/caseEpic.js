import { switchMap , filter } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { customisedAction } from '../actions'
import { generalizedEpic } from './generalizedEpic'
import { END_POINTS } from '../../constants/apis'
import { Alert } from 'react-native'
import { ADD_CASE, ADD_CASE_FAILURE, ADD_CASE_SUCCESS, PAYMENT, PAYMENT_FAILURE, PAYMENT_SUCCESS, USER_CASE, USER_CASE_FAILURE, USER_CASE_SUCCESS } from '../../constants/actions'


export class caseEpic{
    static caseAdd = action$ =>
    action$.pipe(
      ofType(ADD_CASE), 
      switchMap(
        async ({ payload: { data, navigation }}) => {
          console.log('data', data)
          return generalizedEpic(
            'post',  
            END_POINTS.addCase,
            data, 
            (resObj) => {
                navigation.navigate('Payment' , {caseId: resObj.id , mode: resObj.modeofRegistration} )
                return customisedAction(ADD_CASE_SUCCESS)
            },
           ADD_CASE_FAILURE
          )
         
        }
      )
    )
    static stripePayment = action$ =>
    action$.pipe(
      ofType(PAYMENT), 
      switchMap(
        async ({ payload: { data, navigation , session }}) => {
          return generalizedEpic(
            'post',  
            END_POINTS.payment,
            data, 
            (resObj) => {
                navigation.navigate('Home')
                Alert.alert("Your Case Has Been Registered!")
                return customisedAction(PAYMENT_SUCCESS , {session})
            },
           PAYMENT_FAILURE
          )
         
        }
      )
    )
    static getCase = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case USER_CASE:
            return true;
          case PAYMENT_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(
        async ({ payload: { session}}) => {
          return generalizedEpic(
            'get',  
            `${END_POINTS.getIdCase}?applicationUserId=${session.id}`, 
              null,
            (resObj) => {
                return customisedAction(USER_CASE_SUCCESS, resObj)
            },
           USER_CASE_FAILURE
          )
         
        }
      )
    )
}