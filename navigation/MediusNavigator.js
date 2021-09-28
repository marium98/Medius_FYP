import React from 'react';
import {View , Text , StyleSheet , Platform , Image} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { Ionicons , FontAwesome5 , AntDesign , MaterialCommunityIcons} from '@expo/vector-icons';
import Colors from '../constants/Color';
//components
import CustomDrawer from "../components/CustomDrawer";

//screens
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/Settings';
import ProfileScreen from '../screens/MyProfileScreen';
import CaseInformation from '../screens/CaseInformationScreen';
import RegistrationStatus from "../screens/RegistrationStatusScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import FAQScreen from "../screens/FAQsScreen";
import LogoutScreen from '../screens/logoutScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import TrademarkScreen from '../screens/TrademarkScreen';
import PatentScreen from '../screens/PatentScreen';
import DesignScreen from '../screens/DesignScreen';
import CopyrightScreen from '../screens/CopyrightScreen';
import AboutScreen from '../screens/AboutScreen';
import QuestionScreen from '../screens/QuestionScreen';
import PolicyScreen from '../screens/PolicyScreen';
import ContactScreen from '../screens/ContactScreen';
import TermScreen from '../screens/TermScreen';
import LoginScreen from '../screens/LoginScreen';
import ShowInformation from '../screens/ShowInformationScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OtpScreen from '../screens/OTPScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ValidateToken from '../screens/ValidateTokenScreen';
import ResetPassword from '../screens/ResetPasswordScreen';

const MediusNavigator = createStackNavigator({
    Home: HomeScreen,
    Setting: SettingScreen,
    Password: ChangePasswordScreen,
    Trademark: TrademarkScreen,
    Patent: PatentScreen,
    Design: DesignScreen,
    Copyright: CopyrightScreen,
    Payment: PaymentScreen
});

const Profile = createStackNavigator({
    MyProfile: ProfileScreen,
    Home: HomeScreen,
    Setting: SettingScreen,
});

const MySettings = createStackNavigator({
    Setting: SettingScreen,
    MyProfile: ProfileScreen,
    Change: ChangePasswordScreen,
    Notification: NotificationsScreen
});

const TabOptions = {
    Home: {
        screen:MediusNavigator , 
        navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return(
            <Ionicons name='ios-home' size={25} color={tabInfo.tintColor} />);
        },
        tabBarColor: Colors.primaryColor
    }},
    MyProfile: {
        screen:Profile , 
        navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return(
                <FontAwesome5 name='user-circle' size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.primaryColor
    }},
    Setting: {
        screen:MySettings , 
        navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return(
                <Ionicons  name='ios-settings' size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.primaryColor
    }},
};


const FavNavTab = Platform.OS == 'android' ? 
createMaterialBottomTabNavigator(
    TabOptions , {
        activeColor: 'white',
        shifting: true
    }
) : createBottomTabNavigator(
    TabOptions , {
            tabBarOptions: {
                    activeTintColor: 'white'

        }
        }           
);
// Drawer Items
const CaseNavigator = createStackNavigator(
    {
     Case: CaseInformation,
     Info: ShowInformation
    },
  );

const RegisterNavigator = createStackNavigator({
    Register: RegistrationStatus
});

const SettingNavigator = createStackNavigator({
    Setting: SettingScreen
});

const HelpNavigator = createStackNavigator({
    Help: FAQScreen,
    About: AboutScreen,
    Question: QuestionScreen,
    Policy: PolicyScreen,
    Contact: ContactScreen,
    Term: TermScreen,
});

const LogoutNavigator = createStackNavigator({
    Logout: LogoutScreen
});

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: FavNavTab,
            navigationOptions: {
                drawerLabel: 'Home',
                drawerIcon:  <MaterialCommunityIcons  name='home-circle-outline' size={25}  />
              }

        },
        Case: {
           screen: CaseNavigator,
           navigationOptions: {
            drawerLabel: 'Registered Cases',
            drawerIcon:  <Ionicons  name='information-circle-outline' size={25}  />
          }
       },
        Registration: {
        screen: RegisterNavigator,
        navigationOptions: {
         drawerLabel: 'Registration Status',
         drawerIcon:  <MaterialCommunityIcons  name='registered-trademark' size={25}  />
       }
    },
        Help: {
            screen: HelpNavigator,
            navigationOptions: {
             drawerLabel: 'FAQs & Help',
             drawerIcon:  <Ionicons  name='help-circle-outline' size={25}  />
           }
        },
        Setting: {
                screen: SettingNavigator,
                navigationOptions: {
                 drawerLabel: 'Settings',
                 drawerIcon:  <Ionicons name="settings-outline" size={24}  />
               }
            },
        Logout: {
            screen: LogoutNavigator,
            navigationOptions: {
            //  drawerLabel: 'FAQs & Help',
             drawerIcon:  <AntDesign  name='logout' size={24}  />
           }
        },
    },
    {
        drawerWidth: 300,
        initialRouteName: 'Home',
        contentComponent: CustomDrawer,
        contentOptions: {
          activeTintColor: 'white',
          activeBackgroundColor: Colors.primaryColor,
          inactiveTintColor: 'black',
          labelStyle: 'normal'
        }
    }
  );

const AuthScreens = createStackNavigator({
    Login: LoginScreen,
    Otp: OtpScreen,
    Register: RegisterScreen,
    ForgetPassword: ForgetPasswordScreen,
    ValidateToken: ValidateToken,
    ResetPassword: ResetPassword
},
    {
        headerMode: 'none',
        transitionConfig: () => fromRight(),
      }
);

export const AppNavigator = createAppContainer(MainNavigator);
export const AuthNavigator = createAppContainer(AuthScreens);