import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { customisedAction } from '../redux/actions';
import { SET_SESSION } from '../constants/actions';

const SplashScreen = () => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {

    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_data').then((value) => {
        if (!!value) {
          const data = JSON.parse(value)
            dispatch(customisedAction(SET_SESSION, data))
        }
        else
            dispatch(customisedAction(SET_SESSION, null))
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/avatar.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
