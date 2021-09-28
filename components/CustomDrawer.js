import React from 'react';
import {View,Text,ScrollView,StyleSheet} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {SafeAreaView} from 'react-navigation';
import {Avatar} from 'react-native-elements';
import Colors from '../constants/Color';
import { useSelector } from 'react-redux';

const CustomDrawer = props => {
  const session = useSelector(({ sessionReducer }) => sessionReducer.session)
    return(
        <View style={{ flex: 1 }}>

        <ScrollView>
          <SafeAreaView
            // style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <View style={{backgroundColor:Colors.primaryColor}}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                    size="xlarge"
                    overlayContainerStyle={{backgroundColor: '#d8d8d8'}}
                    rounded
                    icon={{name: 'user', type: 'font-awesome' , color: 'orange'}}
                    source= { session.imagePath ? 
                      { uri: session.imagePath } 
                      : require('../assets/avatar.png')
                     }
                    activeOpacity={0.7}
                    containerStyle={{flex: 1, marginLeft: 10, marginTop: 60}}
                    />
                {/* <Avatar rounded title="US" /> */}
                <Text style={{ color: 'white', marginTop: '9%', fontFamily: 'sans-serif-condensed',fontSize: 23 }}>
                  Hey!</Text>
                <Text style={{ color: 'white', fontFamily: 'sans-serif-condensed', fontSize: 23 }}>
                { session.userName}</Text>
              </View>
            </View>

            <DrawerItems {...props} />

            </SafeAreaView>
            </ScrollView>
            </View>
    );
};

const styles = StyleSheet.create({

});

export default CustomDrawer;