import { RestClient } from '../../services/network'
import { customisedAction } from '../actions'
import { Alert } from 'react-native'

export const generalizedEpic = async (method, url, data, successCallback, failureAction) => {
    try {
        let response
        if (method === 'get') 
            response = await RestClient.get(url)
        else if (method === 'post') 
            response = await RestClient.post(url, data)
        else if (method === 'put')
            response = await RestClient.put(url, data)
        const { status, data: resObj, problem } = response
        if (status && (status === 200 || status === 205)) {
          return successCallback(resObj)
        }
        console.log(response)
        if (status && (status === 400 || status === 422 || status === 404)) {
          if(resObj.message){
          Alert.alert('Error',resObj.message)}
          return customisedAction(failureAction,  { message: resObj, type: 'error' })
        }
        if (problem && problem === 'NETWORK_ERROR') {
          Alert.alert('Error','Netwokr error')
          return customisedAction(failureAction,  { message: `Network Error at ${failureAction.replace('_FAILURE', '')}!`, type: 'error' })
        }
        if (problem && problem === 'TIMEOUT_ERROR') {
          Alert.alert('Error','Timeout Error')
          return customisedAction(failureAction,  { message: `Timeout Error at ${failureAction.replace('_FAILURE', '')}!`, type: 'error' })
        }
        Alert.alert('Error','Unknown Error')
        console.log(`${failureAction.replace('_FAILURE', '')} Unknown Error`, response)
        return customisedAction(failureAction,  { message: `Unknown Error at ${failureAction.replace('_FAILURE', '')}!`, type: 'error' })
    } catch (error) {
      Alert.alert('Error','Unknown exception error')
        console.log(`${failureAction.replace('_FAILURE', '')} Unknown Error`, error)
        return customisedAction(failureAction,  { message: error.message, type: 'error' })
    }
}