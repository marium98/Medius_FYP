import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Input, Icon } from 'react-native-elements';
import { Ionicons, Feather, } from '@expo/vector-icons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { customisedAction } from '../redux/actions';
import { CHANGE_PASSWORD } from '../constants/actions';
import { useSelector } from 'react-redux';
import { FancyAlert } from 'react-native-expo-fancy-alerts';


ChangePasswordScreen = props => {
  const session = useSelector(({ sessionReducer }) => sessionReducer.session)

  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [secureText3, setSecureText3] = useState(true);
  const [visible, setVisible] = useState(false);
  const [password , setPassword] = useState("")
  const [newPassword , setNewPassword] = useState("")
  const [confirmPassword ,  setConfirmPassword] = useState("")
  const dispatch = useDispatch()

  const {id} = session
  const {navigation} = props

  const isValid = () => {
    if(!password || password.length < 8){
      <FancyAlert
      visible={visible}
      icon={<View style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 50,
        width: '100%',
      }}><Text>🤓</Text></View>}
      style={{ backgroundColor: 'white' }}
    >
      <Text style={{ marginTop: -16, marginBottom: 32 }}>Hello there</Text>
    </FancyAlert>
      // ToastAndroid.show("Enter valid old password of minimum 8 characters", ToastAndroid.SHORT)
      return false
    } 
    if(!newPassword || newPassword.length < 8){
      ToastAndroid.show("Enter valid new password of minimum 8 characters", ToastAndroid.SHORT)
      return false
    } 
    if(newPassword == password){
      ToastAndroid.show("Old and New password cannot be same", ToastAndroid.SHORT)
      return false
    }
    if(!confirmPassword ||  confirmPassword != newPassword){
      ToastAndroid.show("Confirm Password mismatch", ToastAndroid.SHORT)
      return false
    }

    return true
  }

  const Submit = () => {
    if(isValid()){
      dispatch(customisedAction(CHANGE_PASSWORD,{id , password , newPassword , navigation}))

    }
  }

  return (
    <View style={styles.profile}>
      <View style={styles.searchSection}>
        <Input
          label="Enter Old Password"
          style={styles.input}
          secureTextEntry={secureText1}
          value={password}
          onChangeText={(value) => {
            setPassword(value)
          }}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setSecureText1(!setSecureText1)
              }}
            >
              {
                secureText1 ? (
                  <Icon name='eye-off-outline'
                    type='ionicon'
                    color='#000000' />
                ) : (
                  <Icon name='eye-outline'
                    type='ionicon'
                    color={Colors.primaryColor} />
                )
              }

            </TouchableOpacity>
          }
        />
        <Input
          label="Enter New Password"
          style={styles.input}
          secureTextEntry={secureText2}
          value={newPassword}
          onChangeText={(value) => setNewPassword(value)}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setSecureText2(!setSecureText2)
              }}
            >
              {
                secureText2 ? (
                  <Icon name='eye-off-outline'
                    type='ionicon'
                    color='#000000' />
                ) : (
                  <Icon name='eye-outline'
                    type='ionicon'
                    color={Colors.primaryColor} />
                )
              }

            </TouchableOpacity>
          }
        />
        <Input
          label="Confirm Password"
          style={styles.input}
          secureTextEntry={secureText3}
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setSecureText3(!setSecureText3)
              }}
            >
              {
                secureText3 ? (
                  <Icon name='eye-off-outline'
                    type='ionicon'
                    color='#000000' />
                ) : (
                  <Icon name='eye-outline'
                    type='ionicon'
                    color={Colors.primaryColor} />
                )
              }

            </TouchableOpacity>
          }
        />
        <TouchableOpacity onPress={() => Submit() }
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

};


ChangePasswordScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Change Password!',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item

          title="Menu"
          iconName="ios-menu"
          color='black'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Ionicons name='arrow-back-circle-sharp' size={40}
          color={Colors.primaryColor} style={{ paddingRight: 10 }}
          onPress={() => navData.navigation.goBack(null)}
        />
      </HeaderButtons>

    ),
  };
};





const styles = StyleSheet.create({
  profile: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  input: {
    // height: 43,
    // margin: 20,
    fontSize: 20,
    borderColor: Colors.primaryColor
  },
  searchSection: {
    justifyContent: 'center',
    margin: 30,
  },
  appButtonContainer: {
    marginTop: 8,
    marginLeft: 120,
    marginRight: 110,
    elevation: 8,
    backgroundColor: Colors.primaryColor,
    borderRadius: 17,
    padding: 16,
    // paddingVertical: 10,
    // // paddingRight:10,
    // paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});

export default ChangePasswordScreen;