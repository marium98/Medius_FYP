import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Avatar } from 'react-native-elements';
import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Color';
import { NavigationActions } from 'react-navigation';

const AboutScreen = props => {
  return (
    <View style={styles.About}>
      <Text style={styles.paraText}>
        The basic aim of the Medius is to help in facilitating anyone who wants to get his Intellectual Property registered.
            {"\n"}
      </Text>
      <Text style={styles.paraText}>
        The aim of citing this application is to:
        {"\n"}
        {"\n"}
              1) Facilitate organizations who want to
              get their Intellectual Property registered.
              {"\n"} {"\n"} {"\n"}
              2) Keep them updated about their
              process status through notifications.
              {"\n"} {"\n"} {"\n"}
              3)Give them the provision to search
              about their status.
              {"\n"} {"\n"} {"\n"}
      </Text>
    </View>

  );

};

AboutScreen.navigationOptions = ({ navData, navigation }) => {
  return {
    headerTitle: 'About Medius',
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
        <Ionicons name='arrow-back-circle-sharp' size={40} color={Colors.primaryColor} style={{ paddingRight: 10 }}
          onPress={() => navigation.goBack(null)} />
      </HeaderButtons>
    ),
  };
};


const styles = StyleSheet.create({
  About: {
    padding: 10,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  paraText: {
    fontSize: 20,
  }
});

export default AboutScreen;