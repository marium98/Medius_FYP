import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { customisedAction } from '../actions'
import { generalizedEpic } from './generalizedEpic'
import { END_POINTS } from '../../constants/apis'
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILURE } from '../../constants/actions'

export class NotificatonsEpic {
    static getNotifications = action$ =>
        action$.pipe(
            ofType(GET_NOTIFICATIONS),
            switchMap(
                async () => {
                    return generalizedEpic(
                        'get',
                        END_POINTS.getNotifications,
                        null,
                        (resObj) => customisedAction(GET_NOTIFICATIONS_SUCCESS, resObj),
                        GET_NOTIFICATIONS_FAILURE
                    )
                }
            )
        )
}