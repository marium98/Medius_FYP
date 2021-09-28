/* eslint-disable import/named */
import { create } from 'apisauce'
// import { BASE_URL } from '../../constants'
export const BASE_URL = "http://192.168.10.5:45455/api/"
//https://localhost:44364/api/
// http://ec2-52-15-148-90.us-east-2.compute.amazonaws.com/dev/

// Rest Client for Americamp APIs
export const RestClient = create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: 'application/json',
    Authorization: '',
  },
  timeout: 60000,
})
