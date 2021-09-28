import React, { useState } from 'react';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons} from 'react-native-vector-icons';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Alert,
  Keyboard,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import * as yup from 'yup'
import Colors from '../constants/Color';
import Card from '../components/Card';
import { Formik } from 'formik'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { customisedAction } from '../redux/actions';
import { SIGN_UP } from '../constants/actions';

const phoneRegExp = RegExp(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/);

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} letters`)
    .required('Password is required'),
  CNIC: yup
    .string()
    .min(13, ({ min }) => `CNIC must be at least ${min} digits`)
    .required('CNIC is required'),
  firstName: yup
    .string()
    .required('First Name is Required'),
  lastName: yup
    .string()
    .required('Last Name is Required'),
  PhoneNumber: yup
    .string().matches(phoneRegExp, 'Phone number is not valid')
    .required('Cellphone number is Required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})


const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
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
              <Text style={styles.headerTitle} >
                Welcome! Register here
              </Text>
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
                        <FontAwesome style={styles.searchIcon} name="user" size={20} color="#bbbbbb"/>
                          <TextInput
                            style={styles.inputStyle}
                            name="firstName"
                            placeholder="Enter your First Name"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                          />
                          {(errors.firstName && touched.firstName) &&
                            <Text style={styles.errorTextStyle}>{errors.firstName}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                        <FontAwesome style={styles.searchIcon} name="user" size={20} color="#bbbbbb"/>
                          <TextInput
                            style={styles.inputStyle}
                            name="lastName"
                            placeholder="Enter your Last Name"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                          />
                          {(errors.lastName && touched.lastName) &&
                            <Text style={styles.errorTextStyle}>{errors.lastName}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                        <FontAwesome5 name="phone-alt" style={styles.searchIcon} size={20} color="#bbbbbb" />
                          <TextInput
                            style={styles.inputStyle}
                            name="PhoneNumber"
                            placeholder="Enter your PhoneNumber"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('PhoneNumber')}
                            onBlur={handleBlur('PhoneNumber')}
                            value={values.PhoneNumber}
                          />
                          {(errors.PhoneNumber && touched.PhoneNumber) &&
                            <Text style={styles.errorTextStyle}>{errors.PhoneNumber}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                        <FontAwesome name="id-card" style={styles.searchIcon} size={20} color="#bbbbbb" />
                          <TextInput
                            style={styles.inputStyle}
                            name="CNIC"
                            placeholder="Enter your CNIC"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('CNIC')}
                            onBlur={handleBlur('CNIC')}
                            value={values.CNIC}
                          />
                          {(errors.CNIC && touched.CNIC) &&
                            <Text style={styles.errorTextStyle}>{errors.CNIC}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                        <MaterialCommunityIcons style={styles.searchIcon} name="email-outline" size={20} color="#bbbbbb"/>
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
                        <MaterialCommunityIcons style={styles.searchIcon} name="lock" size={20} color="#bbbbbb"/>
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
                        <View style={styles.SectionStyle}>
                        <MaterialCommunityIcons style={styles.searchIcon} name="lock" size={20} color="#bbbbbb"/>
                          <TextInput
                            style={styles.inputStyle}
                            name="confirmPassword"
                            placeholder="Enter your confirmPassword"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry
                          />
                          {(errors.confirmPassword && touched.confirmPassword) &&
                            <Text style={styles.errorTextStyle}>{errors.confirmPassword}</Text>
                          }
                        </View>

                        <Pressable
                          style={{
                            backgroundColor: '#25D366', padding: 10, margin: 20, borderRadius: 50,
                            width: '40%', alignSelf: 'center'
                          }}
                          onPress={() => dispatch(customisedAction(SIGN_UP, {
                            data: {
                              firstName: values.firstName,
                              lastName: values.lastName,
                              PhoneNumber: values.PhoneNumber,
                              CNIC: values.CNIC,
                              email: values.email,
                              role: 1,
                              password: values.password,
                              confirmPassword: values.confirmPassword,
                              acceptTerms: true
                            }, navigation
                          }))}
                        ><Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>Register</Text></Pressable>
                      </>
                    )}
                  </Formik>
                </Card>
              </View>
              <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 30 }}>
                <Text
                  style={{color: '#7B8B9A',
                  fontSize: 16,}}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={{color: Colors.primaryColor,
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'underline',}}> Login Now! </Text>
                </TouchableOpacity>

              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View >
  )
}
export default RegisterScreen;

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
  registerTextStyle: {
    color: '#7B8B9A',
    fontSize: 18,

  },
  spanStyle: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline',

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
    marginRight: 40
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
    marginTop: 17,
    zIndex: 1200,
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
    fontSize: 14,
    padding: 10,
    width: 250
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
    fontSize: 14,
    paddingTop: 12,
    textDecorationLine: 'underline',
    marginLeft: 80
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
    fontSize: 30,
    textAlign: 'left',
    marginTop: -58,
    paddingLeft: 5

  },
  buttonConatiner: {
    marginBottom: 20,
    marginTop: -20,
    width: 1200,
    maxWidth: '95%',
    height: 550,
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
});
