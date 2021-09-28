import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { RestClient } from '../../services/network'
import { customisedAction } from '../actions'
import { generalizedEpic } from './generalizedEpic'
import {
  LOGIN,
  SET_SESSION,
  LOGIN_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  SEND_OTP,
  SEND_OTP_FAILURE,
  SEND_OTP_SUCCESS,
  VALIDATE_OTP,
  REFRESH_TOKEN,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  UPDATE_IMAGE,
  UPDATE_IMAGE_FAILURE,
  GET_PROFILE,
  GET_PROFILE_FAILURE
} from '../../constants/actions'
import { END_POINTS } from '../../constants/apis'
import { Alert } from 'react-native'

export class sessionEpic {
  static login = action$ =>
    action$.pipe(
      ofType(LOGIN),
      switchMap(
        async ({ payload: { email, password, navigation } }) => {
          return generalizedEpic(
            'post',
            END_POINTS.userLogin,
            { email, password },
            (resObj) => {
              RestClient.setHeader('Authorization', `Bearer ${resObj.jwtToken}`)
              RestClient.setHeader('Cookie', `refreshToken=${resObj.refreshToken}`)
              // return customisedAction(SET_SESSION, resObj)
              return customisedAction(SEND_OTP, { session: resObj, navigation })
            },
            LOGIN_FAILURE
          )
        }
      )
    )
  static sendOtp = action$ =>
    action$.pipe(
      ofType(SEND_OTP),
      switchMap(
        async ({ payload: { session, navigation } }) => {
          return generalizedEpic(
            'get',
            `${END_POINTS.sendOtp}?id=${session.id}`,
            null,
            () => {
              Alert.alert('OTP send Successfully!')
              navigation.navigate('Otp', { session })
              return customisedAction(SEND_OTP_SUCCESS)
            },
            SEND_OTP_FAILURE
          )
        }
      )
    )
  static validateOtp = action$ =>
    action$.pipe(
      ofType(VALIDATE_OTP),
      switchMap(
        async ({ payload: { session, OTP } }) => {
          return generalizedEpic(
            'get',
            `${END_POINTS.validateOtp}?id=${session.id}&OTP=${OTP}`,
            null,
            () => {
              return customisedAction(SET_SESSION, session)
            },
            SEND_OTP_FAILURE
          )
        }
      )
    )
  static refreshToken = action$ =>
    action$.pipe(
      ofType(REFRESH_TOKEN),
      switchMap(
        async () => {
          return generalizedEpic(
            'post',
            `${END_POINTS.refreshToken}`,
            null,
            (resObj) => {
              RestClient.setHeader('Authorization', `Bearer ${resObj.jwtToken}`)
              RestClient.setHeader('Cookie', `refreshToken=${resObj.refreshToken}`)
              return customisedAction(REFRESH_TOKEN_SUCCESS)
            },
            REFRESH_TOKEN_FAILURE
          )
        }
      )
    )
  static register = action$ =>
    action$.pipe(
      ofType(SIGN_UP),
      switchMap(
        async ({ payload: { data, navigation } }) => {
          return generalizedEpic(
            'post',
            END_POINTS.userRegister,
            data,
            () => {
              Alert.alert("Sign Up Successful", "Check Your Email For Verification")
              navigation.navigate('Login')
              return customisedAction(SIGN_UP_SUCCESS)
            },
            SIGN_UP_FAILURE
          )
        }
      )
    )
  static getProfile = action$ =>
    action$.pipe(
      ofType(GET_PROFILE),
      switchMap(
        async ({ payload: { id } }) => {
          return generalizedEpic(
            'get',
            `${END_POINTS.getProfile}?id=${id}`,
            null,
            (resObj) => {
              return customisedAction(SET_SESSION, resObj)
            },
            GET_PROFILE_FAILURE
          )
        }
      )
    )
  static updateProfile = action$ =>
    action$.pipe(
      ofType(UPDATE_PROFILE),
      switchMap(
        async ({ payload: { firstName, lastName, cnic, email, phoneNumber } }) => {
          return generalizedEpic(
            'put',
            END_POINTS.profileUpdate,
            { id, firstName, lastName, cnic, email, phoneNumber },
            () => {
              return customisedAction(GET_PROFILE, { id })
            },
            UPDATE_PROFILE_FAILURE
          )
        }
      )
    )
  static updateImage = action$ =>
    action$.pipe(
      ofType(UPDATE_IMAGE),
      switchMap(
        async ({ payload: {formData, id } }) => {
          return generalizedEpic(
            'post',
            `${END_POINTS.updateImage}?id=${id}`,
            formData,
            () => {
              return customisedAction(GET_PROFILE, { id })
            },
            UPDATE_IMAGE_FAILURE
          )
        }
      )
    )
  static changePassword = action$ =>
    action$.pipe(
      ofType(CHANGE_PASSWORD),
      switchMap(
        async ({ payload: { id, password, newpassword, navigation } }) => {
          return generalizedEpic(
            'put',
            END_POINTS.changePassword,
            { id, password, newpassword },
            (resObj) => {
              console.log(resObj)
              Alert.alert("Password changed successfully")
              navigation.navigate("Home")
              return customisedAction(CHANGE_PASSWORD_SUCCESS)
            },
            CHANGE_PASSWORD_FAILURE
          )
        }
      )
    )
}
