import React from 'react';
import {View , Text , StyleSheet , Image , TouchableOpacity , Platform} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Avatar} from 'react-native-elements';
import HeaderButton from '../components/HeaderButton';
import {Ionicons,FontAwesome,MaterialIcons} from '@expo/vector-icons';
import Colors from '../constants/Color';
import { NavigationActions } from 'react-navigation';
import { Divider } from 'react-native-paper';

const SettingScreen = props => {
  return(
    <View style={styles.setting}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
              routeName: 'Change'
          }); }}
      >
        <View style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center"
        }}>
        <Ionicons name="ios-lock-closed" size={24} color="black" />
        <Text style={{fontSize: 18 , padding:10, color:"black",}}>Change Password</Text>
        <MaterialIcons name="arrow-right" size={40} color={Colors.primaryColor} style={{ position: 'absolute', right: 0 }} />
        </View>
       
      </TouchableOpacity>
     <Divider />
     <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
              routeName: 'MyProfile'
          }); }}
      >
        <View style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center"
        }}>
        <FontAwesome name="user-circle" size={24} color="black" />
        <Text style={{fontSize: 18 , padding:10}}>Update Profile</Text>
        <MaterialIcons name="arrow-right" size={40} color={Colors.primaryColor} style={{ position: 'absolute', right: 0 }} />
        </View>
       
      </TouchableOpacity>
     <Divider />
     <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
              routeName: 'Notification'
          }); }}
      >
        <View style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center"
        }}>
        <Ionicons name="md-notifications-sharp" size={24} color="black" />
        <Text style={{fontSize: 18 , padding:10}}>Notifications</Text>
        <MaterialIcons name="arrow-right" size={40} color={Colors.primaryColor} style={{ position: 'absolute', right: 0 }} />
        </View>
       
      </TouchableOpacity>
     <Divider />
      
    </View>
  );
};

SettingScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Settings',
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
          color={Colors.primaryColor} style={{paddingRight:10}}
          onPress={() => navData.navigation.goBack(null)}
           />
      </HeaderButtons>
       
    ),
  };
};


const styles = StyleSheet.create({
  setting:{
   
    justifyContent:'center',
    alignContent:'center'
  }
});

export default SettingScreen;



