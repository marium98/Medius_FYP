import React from 'react';
import { AppNavigator, AuthNavigator } from "./navigation/MediusNavigator";
import 'react-native-gesture-handler';
// Import Screens
import { useSelector } from 'react-redux';

const Main = () => {

  const session = useSelector(({ sessionReducer }) => sessionReducer.session)


  return (
    
        !!session.id ? <AppNavigator /> : <AuthNavigator/>
        // !!session ? <AppNavigator /> : <AppNavigator/>
    
    );
};

export default Main;