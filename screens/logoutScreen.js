import React,{useEffect} from 'react';
import {View , Text , StyleSheet , Button} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {FontAwesome5} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderButton from '../components/HeaderButton';
import { customisedAction } from '../redux/actions';
import { SET_SESSION } from '../constants/actions';

const LogoutScreen = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    AsyncStorage.removeItem('user_data')
    .then(() => dispatch(customisedAction(SET_SESSION,{})))
  },[])
    return(
      <View></View>
    );

};


const styles = StyleSheet.create({
    profile:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LogoutScreen;