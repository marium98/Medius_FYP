import { combineEpics } from 'redux-observable'
import { genericDataEpic } from './genericDataEpic'
import { sessionEpic } from './sessionEpic'
import { caseEpic } from './caseEpic'
import { ForgetPasswordEpic } from './forgetPasswordEpic'
import { NotificatonsEpic } from './notificatonsEpic'

export const epics = combineEpics(
    genericDataEpic.getCities,
    genericDataEpic.getTechnologies,
    genericDataEpic.getClaims,
    genericDataEpic.getCategories,
    genericDataEpic.getAllIpFilters,
    sessionEpic.login,
    sessionEpic.sendOtp,
    sessionEpic.validateOtp,
    sessionEpic.refreshToken,
    sessionEpic.register,
    sessionEpic.getProfile,
    sessionEpic.updateProfile,
    sessionEpic.updateImage,
    sessionEpic.changePassword,
    genericDataEpic.getFaqs,
    caseEpic.caseAdd,
    caseEpic.getCase,
    caseEpic.stripePayment,
    ForgetPasswordEpic.foergetPassword,
    ForgetPasswordEpic.validateToken,
    ForgetPasswordEpic.resetPassword,
    NotificatonsEpic.getNotifications
)
