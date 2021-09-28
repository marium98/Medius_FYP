import React, { Component } from "react";
import {Linking,Platform,TouchableOpacity,Text,View,StyleSheet} from "react-native";
import {Ionicons,Feather} from '@expo/vector-icons';
import Colors from '../constants/Color';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { NavigationActions } from 'react-navigation';

export default class ContactScreen extends Component {

  dialCall = (number) => {
     let phoneNumber = '';
     if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
     else {phoneNumber = `telprompt:${number}`; }
     Linking.openURL(phoneNumber);
  };
 
  render(){
         return(
           <View style={styles.contact}>
             <Text style={styles.paraText}>For further support you can call our helpline using the
             option below:
             {"\n"}  {"\n"} {"\n"}
             </Text>
                 <Text style={styles.paraText}>For Karachi
                 {"\n"}
                 </Text>
                    
                 <TouchableOpacity
                    style={{
                    height: 60,
                    width: 220,
                    backgroundColor: Colors.primaryColor,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30
                    }}
                  onPress={()=>{this.dialCall(18000)}}
                 >
                 <View style={styles.section}>
                       <Feather name="phone-call" size={23} color="white" style={styles.imageSection}  />
                       <Text style={{fontSize:20,color:'white'}} >18000</Text>
                 </View>
                 </TouchableOpacity>
 
                 <View style={styles.contact}>
                 <Text style={styles.paraText}>For Other Cities
                 {"\n"}
                 </Text>
                    
                 <TouchableOpacity
                    style={{
                    height: 60,
                    width: 220,
                    backgroundColor: Colors.primaryColor,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30
                    }}
                  onPress={()=>{this.dialCall(2239)}}
                 >
                 <View style={styles.section}>
                       <Feather name="phone-call" size={30} color="white" style={styles.imageSection}  />
                       <Text style={{fontSize:20,color:'white'}} >2239</Text>
                 </View>
                 </TouchableOpacity>
                 </View>
                 </View>
               );
   }
 
 };

ContactScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Contact Medius',
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
        <Ionicons name='arrow-back-circle-sharp' size={40} color={Colors.primaryColor} style={{paddingRight:10}}
        onPress={() => navData.navigation.goBack(null)} />  
  </HeaderButtons>
   ),
    };
  };
  

  const styles = StyleSheet.create({
    contact:{
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    section:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 40,
      // margin: 10,
    },
    imageSection:{
      padding: 6,
      margin: 5,
      alignItems: 'flex-start',
    },
    paraText:{
      fontSize:20,
    }
  });
