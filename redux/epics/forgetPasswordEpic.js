import { switchMap, filter } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { customisedAction } from '../actions'
import { generalizedEpic } from './generalizedEpic'
import { END_POINTS } from '../../constants/apis'
import { Alert } from 'react-native'
import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS , FORGOT_PASSWORD_FAILURE, VALIDATE_RESET, VALIDATE_RESET_FAILURE, VALIDATE_RESET_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../../constants/actions'

export class ForgetPasswordEpic {
    static foergetPassword = action$ =>
        action$.pipe(
            ofType(FORGOT_PASSWORD),
            switchMap(
                async ({ payload: { data, navigation } }) => {
                    return generalizedEpic(
                        'post',
                        END_POINTS.forgetPassword,
                        data,
                        (resObj) => {
                            navigation.navigate("ValidateToken")
                            return customisedAction(FORGOT_PASSWORD_SUCCESS)
                        },
                        FORGOT_PASSWORD_FAILURE
                    )

                }
            )
        )
    static validateToken = action$ =>
        action$.pipe(
            ofType(VALIDATE_RESET),
            switchMap(
                async ({ payload: { resetToken, navigation } }) => {
                    return generalizedEpic(
                        'get',
                        `${END_POINTS.validateReset}?resetToken=${resetToken}`,
                        null,
                        (resObj) => {
                            navigation.navigate("ResetPassword", { token: resetToken })
                            return customisedAction(VALIDATE_RESET_SUCCESS)
                        },
                        VALIDATE_RESET_FAILURE
                    )
                }
            )
        )
        static resetPassword = action$ =>
        action$.pipe(
            ofType(RESET_PASSWORD),
            switchMap(
                async ({ payload: { data, navigation } }) => {
                    return generalizedEpic(
                        'post',
                        END_POINTS.resetPassword,
                        data,
                        (resObj) => {
                            Alert.alert("Your Password Has Been Reset!")
                            navigation.navigate("Login")
                            return customisedAction(RESET_PASSWORD_SUCCESS)
                        },
                        RESET_PASSWORD_FAILURE
                    )

                }
            )
        )
}