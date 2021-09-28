import React, { useState, createRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import * as yup from 'yup'
import Colors from '../constants/Color';
import Card from '../components/Card';
import { Formik } from 'formik'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import { useDispatch , useSelector} from 'react-redux';
import { customisedAction } from '../redux/actions';
import { LOGIN } from '../constants/actions';
import { Alert } from 'react-native';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} letters`)
    .required('Password is required'),
})


const lOGIN = ({ navigation }) => {
  // const loading = useSelector(({ sessionReducer }) => sessionReducer.loading)
  const dispatch = useDispatch()
  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.header}>
              <View style={{marginTop: -258 , display: 'flex' , flexDirection: 'row'}}>
              <Text style={styles.headerTitle} >
                Welcome Back! 
           </Text>
           <Image source = { require('../assets/hello.png') } style={{height: 40, width: 40 , tintColor: 'white'}} />
              </View>
            </View>
            <View>
              <View style={styles.card}>
                <Card style={styles.buttonConatiner}>
                  <Formik
                    validateOnMount={true}
                    validationSchema={loginValidationSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => console.log(values)}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      isValid,
                    }) => (
                      <>
                        <View style={styles.SectionStyle}>
                        <Icon style={styles.searchIcon} name="email-outline" size={20} color="#bbbbbb"/>
                          <TextInput
                            style={styles.inputStyle}
                            name="email"
                            placeholder="Enter your email address"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                          />
                          {(errors.email && touched.email) &&
                            <Text style={styles.errorTextStyle}>{errors.email}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                        <Icon style={styles.searchIcon} name="lock" size={20} color="#bbbbbb"/>
                          <TextInput
                            style={styles.inputStyle}
                            name="password"
                            placeholder="Enter your password"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                          />
                          {(errors.password && touched.password) &&
                            <Text style={styles.errorTextStyle}>{errors.password}</Text>
                          }
                        </View>
                        <TouchableOpacity
                          style={{ ...styles.buttonStyle , backgroundColor: !isValid || values.email === '' ? 'lightgreen' : '' }}
                          activeOpacity={0.1}
                          onPress={() => dispatch(customisedAction(LOGIN, { email: values.email, password: values.password, navigation }))}
                          disabled={!isValid || values.email === ''}>
                          <View>
                            <Icon style={styles.arrowIcon} name="arrow-right" size={80} color="#fff" />
                            <Text style={styles.buttonTextStyle}></Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    )}
                  </Formik>
                </Card>
              </View>
              <View style={{display: 'flex', justifyContent: 'flex-start' , flexDirection: 'row' , marginTop: 40 , paddingLeft: 58}}>
               <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}
               >
                <Text style={styles.spanStyle}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={{display: 'flex', justifyContent: 'center' , flexDirection: 'row' , marginTop: 30}}>
              <Text
                    style={styles.registerTextStyle}>
                    Don't have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Register')} 
                    >
                      <Text style={styles.spanStyle}> Sign Up Now! </Text>
                    </TouchableOpacity>
                    
                    </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View >
  );
};
export default lOGIN;

const styles = StyleSheet.create({
  searchIcon: {
    top: 21,
    left: 10,
    marginRight: 10
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },

  mainBody: {
    marginTop: -280,
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'column',
    width: 450,
    height: 45,
    marginTop: 20,
    marginLeft: 2,
    marginRight: 40,
    marginBottom: 15
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    borderWidth: 0,
    color: '#fff',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 85,
    marginRight: 50,
    marginTop: 35,
    zIndex: 999,
    marginBottom: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100
  },
  buttonTextStyle: {
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#7B8B9A',
    paddingLeft: 35,
    borderBottomColor: '#dadae8',
    borderBottomWidth: 1,
    width: 230,
  },
  registerTextStyle: {
    color: '#7B8B9A',
    fontSize: 18,
    
  },
  TextStyle: {
    color: '#7B8B9A',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 20,
    textDecorationLine: 'underline',
    marginLeft: 80
  },
  spanStyle: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline',
    
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 14,
  },
  header: {
    width: '100%',
    height: 400,
    // paddingTop: 36,
    backgroundColor: Colors.primaryColor, //greencolorfyp //
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomLeftRadius: 50,
    paddingTop: 300,
    borderBottomRightRadius: 50,
  },
  headerTitle: {
    color: 'white',  //white
    fontSize: 34,
    textAlign: 'left',
    // marginTop: -258,
    paddingLeft: 5,
    paddingRight: 5

  },
  buttonConatiner: {
    marginBottom: 20,
    marginTop: -80,
    width: 1200,
    maxWidth: '95%',
    height: 250,
    paddingTop: 20
  },
  card: {
    paddingLeft: 40,
    paddingRight: 20,
  },
  arrowIcon: {
    paddingTop: 35,
    marginLeft: -10,
    zIndex: 999
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});
