import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome5, Ionicons, AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Color';
import { Alert } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { customisedAction } from '../redux/actions';
import { UPDATE_IMAGE } from '../constants/actions';


const ProfileScreen = () => {
  const session = useSelector(({ sessionReducer }) => sessionReducer.session)
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [email, setemail] = React.useState('');
  const [cnic, setcnic] = React.useState('');
  const [phoneNumber, setphoneNumber] = React.useState('');
  const dispatch = useDispatch()
  useEffect(() => {
    if (session) {
      setfirstName(session.firstName)
      setlastName(session.lastName)
      setemail(session.email)
      setcnic(session.cnic)
      setphoneNumber(session.phoneNumber)
    }
  }, [])
  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'jpg': return 'image/jpeg';
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
    }
  }
  let openImagePickerAsync = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
      multiple: false
    });
    console.log(result.uri);
    console.log(result);
    const formData = new FormData();
    const extArr = /\.(\w+)$/.exec(result.name);
    const type = getMimeType(extArr[1]);
    formData.append('file', { uri: result.uri, name: result.name, type })
    dispatch(customisedAction(UPDATE_IMAGE, {formData, id:session.id}))
  };
  return (
    <ScrollView>
      <View style={styles.profile}>
        <TouchableOpacity onPress={
          () => openImagePickerAsync()
        }>
          <View style={{ marginTop: 20 }}>
            <Avatar
              size={140}
              overlayContainerStyle={{ backgroundColor: '#d8d8d8', left: 120, bottom: 10 }}
              rounded
              source={
                { uri: session.imagePath }
                // ? : require('../assets/avatar.png')
              }
            />
          </View>
        </TouchableOpacity>

        <View style={styles.searchSection}>
          <TextInput
            mode='outlined'
            theme={{
              colors: {
                placeholder: Colors.accentColor, text: 'black', primary: Colors.primaryColor,
                underlineColor: 'transparent',
              }
            }}
            value={firstName}
            onChangeText={(value) => setfirstName(value)}
            label="First Name"
            style={styles.input}
            left={
              <TextInput.Icon
                name="account"
                color={Colors.accentColor}
                style={{ paddingTop: 7 }}
              />
            }
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            mode='outlined'
            theme={{
              colors: {
                placeholder: Colors.accentColor, text: 'black', primary: Colors.primaryColor,
                underlineColor: 'transparent',
              }
            }}
            value={lastName}
            onChangeText={(value) => setlastName(value)}
            label="Last Name"
            style={styles.input}
            left={
              <TextInput.Icon
                name="account"
                color={Colors.accentColor}
                style={{ paddingTop: 7 }}
              />
            }
          />
        </View>


        <View style={styles.searchSection}>
          <TextInput
            mode='outlined'
            theme={{
              colors: {
                placeholder: Colors.accentColor, text: 'black', primary: Colors.primaryColor,
                underlineColor: 'transparent',
              }
            }}
            value={email}
            onChangeText={(value) => setemail(value)}
            label="Email"
            style={styles.input}
            left={
              <TextInput.Icon
                name="email"
                color={Colors.accentColor}
                style={{ paddingTop: 7 }}
              />
            }
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            mode='outlined'
            keyboardType='numeric'
            theme={{
              colors: {
                placeholder: Colors.accentColor, text: 'black', primary: Colors.primaryColor,
                underlineColor: 'transparent',
              }
            }}
            value={phoneNumber}
            onChangeText={(value) => setphoneNumber(value)}
            label="Contact"
            style={styles.input}
            left={
              <TextInput.Icon
                name="phone-plus"
                color={Colors.accentColor}
                style={{ paddingTop: 7 }}
              />
            }
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            mode='outlined'
            theme={{
              colors: {
                placeholder: Colors.accentColor, text: 'black', primary: Colors.primaryColor,
                underlineColor: 'transparent',
              }
            }}
            value={cnic}
            onChangeText={(value) => setcnic(value)}
            label="CNIC"
            style={styles.input}
            left={
              <TextInput.Icon
                name="card-text-outline"
                color={Colors.accentColor}
                style={{ paddingTop: 7 }}
              />
            }
          />
        </View>

        <TouchableOpacity
          onPress={() => Alert.alert('Your Profile Has Been Updated!')}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};


ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Profile',
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
  avt: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,

  },
  input: {

    // flex:1,
    // width: 200,
    height: 43,
    // padding: 8,
    //  borderBottomWidth: 1,
    //   borderBottomColor: Colors.accentColor, 
    // borderWidth: 1,
    // borderColor: 'black',
    margin: 10,
    fontSize: 20,
  },
  profile: {
    // flex: 1,
    justifyContent: 'center',
    //  alignItems: 'center'
  },
  textInputStyle: {
    // // borderColor: '#9a73ef',  
    // // borderWidth: 1,  
    borderBottomWidth: 1,
    borderBottomColor: Colors.accentColor,
    height: 40,
    fontSize: 20,
    fontWeight: 'bold',
    // marginLeft: 20,  
    margin: 12,
    padding: 8,

  },
  btn: {

    marginLeft: 100,
    marginRight: 100,

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
  searchSection: {
    // flexDirection:'row',
    justifyContent: 'center',
    // paddingLeft: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
});

export default ProfileScreen;