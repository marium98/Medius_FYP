import React, { useState, createRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import * as yup from 'yup'
import Colors from '../constants/Color';
import Card from '../components/Card';
import { Formik } from 'formik'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import { useDispatch , useSelector} from 'react-redux';
import { customisedAction } from '../redux/actions';
import { VALIDATE_OTP } from '../constants/actions';

// import Loader from '../components/Loader';

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
})


const OtpScreen = ({ navigation, route }) => {
    const loading = useSelector(({ sessionReducer }) => sessionReducer.loading)
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const dispatch = useDispatch()
    const [session, setSession] = useState({})
    useEffect(() => {
        const { params } = navigation.state
        if (params) {
            const { session: userData } = params
            setSession(userData)
        }
    }, [navigation.state.params]);
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
                                Verification Code
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
                                                    <Text style={styles.registerTextStyle}>
                                                        Please enter the 6 digit OTP code sent to {session.phoneNumber}
                                                    </Text>
                                                </View>
                                                <View style={styles.SectionStyle}>
                                                    <CodeField
                                                        ref={ref}
                                                        {...props}
                                                        value={value}
                                                        onChangeText={setValue}
                                                        cellCount={CELL_COUNT}
                                                        rootStyle={styles.codeFieldRoot}
                                                        keyboardType="number-pad"
                                                        textContentType="oneTimeCode"
                                                        renderCell={({ index, symbol, isFocused }) => (
                                                            <View
                                                                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                                                onLayout={getCellOnLayoutHandler(index)}
                                                                key={index}
                                                                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                                                                <Text style={styles.cellText}>
                                                                    {symbol || (isFocused ? <Cursor /> : null)}
                                                                </Text>
                                                            </View>
                                                        )}
                                                    />
                                                    {(errors.email && touched.email) &&
                                                        <Text style={styles.errorTextStyle}>{errors.email}</Text>
                                                    }
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.buttonStyle}
                                                    activeOpacity={0.5}
                                                    onPress={() => dispatch(customisedAction(VALIDATE_OTP,{session , OTP: value}))}
                                                    >
                                                    <View>
                                                        <Icon style={styles.arrowIcon} name="arrow-forward-outline" size={80} color="#fff" />
                                                        <Text style={styles.buttonTextStyle}></Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        )}

                                    </Formik>
                                </Card>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View >
    );
};
export default OtpScreen;

const styles = StyleSheet.create({
    searchIcon: {
        top: 23,
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
        marginLeft: 100,
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
        padding: 20,
        width: 290,
        textAlign: 'center'
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
        fontSize: 50,
        textAlign: 'left',
        marginTop: -258,
        paddingLeft: 5

    },
    buttonConatiner: {
        marginBottom: 20,
        marginTop: -80,
        width: 1200,
        maxWidth: '98%',
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
        width: 310,
        marginLeft: 2,
        marginRight: 2,
    },
    cellRoot: {
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#7B8B9A',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
});
