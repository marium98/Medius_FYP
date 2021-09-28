import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Color';
import Notification from '../components/NotificationComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector , useDispatch } from 'react-redux';
import { customisedAction } from '../redux/actions';
import { GET_NOTIFICATIONS } from '../constants/actions';

const NotificationsScreen = () => {

  const notifications = useSelector(({ notificatonsReducer }) => notificatonsReducer.notifications)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(customisedAction(GET_NOTIFICATIONS))
  }, [])

  return (
    <ScrollView>
      <View style={styles.Question}>
        {notifications.map((notification, index) => <Notification
        index={index}
        title={notification.title}
        subject={notification.subject}
        description={notification.description}
        createdAt={notification.createdAt}
         /> )}

      </View>
    </ScrollView>
  );

};

NotificationsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Notifications',
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
  Question: {
    marginTop: 10,
    flex: 1
  }
});
export default NotificationsScreen;