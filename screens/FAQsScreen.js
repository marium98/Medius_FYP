import React from 'react';
import {View , Text , StyleSheet , Image , TouchableOpacity ,  Platform,
  TouchableNativeFeedback} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {FontAwesome5 , Ionicons , MaterialIcons , Feather} from '@expo/vector-icons';
import Card from '../components/Card';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Color';

const FAQScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
    return(
        <View style={styles.faqs}>
          <Ionicons name='help-circle-outline' size={60} color={Colors.primaryColor} />
            <Text style={{ color:'black' , fontSize:23 , fontWeight:'bold'}}>How Can We Help?</Text>

            {/* Cards */}
            <View style={{flexDirection:'column'}} >
            <View style={{flexDirection:'row'}}>
              {/* About Medius*/}
          <TouchableCmp  onPress={() => {
          props.navigation.navigate({
              routeName: 'About'
          }); }}>
            <View style={styles.help}>
                <Card style= {styles.aboutContainer} >
                  <MaterialIcons name='mobile-friendly' size={30} color={Colors.primaryColor} />
                  <Text style={styles.textProp}>About Medius</Text>
                  <Text style={styles.Text2}>All the information about medius</Text>
                </Card>
            </View>
          </TouchableCmp>
         
        {/* PatentScreen */}
        <TouchableOpacity style={styles.help} onPress={() => {
          props.navigation.navigate({
              routeName: 'Question'
          }); }}>
          <Card style= {styles.faqContainer} >
            <Ionicons name='md-chatbubbles-outline' size={30} color={Colors.primaryColor} />
            <Text style={styles.textProp}>FAQs</Text>
            <Text style={styles.Text2}>Frequently asked questions</Text>
          </Card>
          </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.help} onPress={() => {
          props.navigation.navigate({
              routeName: 'Contact'
          });
      }}>
          <Card style= {styles.contactContainer} >
            <Feather name='phone-call' size={30} color={Colors.primaryColor} />
            <Text style={styles.textProp}>Contact Us</Text>
            <Text style={styles.Text2}>Contact information about medius</Text>
          </Card>
          </TouchableOpacity>

          <TouchableOpacity style={styles.help} onPress={() => {
          props.navigation.navigate({
              routeName: 'Policy'
          });
      }}>
       
          <Card style= {styles.policyContainer} >
            <Ionicons name='md-newspaper-sharp' size={30} color={Colors.primaryColor} />
            <Text style={styles.textProp}>Privacy Policy</Text>
            <Text style={styles.Text2}>Privacy policy of medius</Text>
          </Card>
          </TouchableOpacity>
          </View>
          </View>
          <TouchableOpacity style={styles.help} onPress={() => {
          props.navigation.navigate({
              routeName: 'Term'
          });
      }}>
       
          <Card style= {styles.termsContainer} >
            <FontAwesome5 name='handshake' size={30} color={Colors.primaryColor} />
            <Text style={styles.textProp}>Terms & Conditions</Text>
            <Text style={{ paddingTop: 10,
        alignItems: 'flex-start',
        fontSize: 14,
        color: Colors.primaryColor,
  }}>Terms & Conditions </Text>
          </Card>
          </TouchableOpacity>
        </View>
    );

};


FAQScreen.navigationOptions = navData => {
    return {
      headerTitle: 'FAQ',
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
    faqs:{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    help:{
      // flex: 1,
      // borderRadius: 4,
      // shadowColor: 'black',
      // shadowOpacity: 0.15,
      // shadowOffset: { width: 0, height: 1 },
      // shadowRadius: 1,
      // alignItems: 'flex-end',
      // padding: 15,
      // flexDirection: 'row',
      // flexWrap: 'wrap',
        // paddingTop: 30,
        // paddingBottom: 50,
        //  marginVertical: 50,
      marginTop:30,
       marginLeft:7,
      marginRight:10,
      justifyContent: 'flex-end',
        //  paddingRight: 70,
      },
     
      buttonConatiner: {
         height: 150,
    },
    aboutContainer: {
      marginLeft: 5,
      // flex:1,
      height: 150,
      width: 180,
      
    },
    faqContainer: {
      // marginRight: 10,
      // marginTop: 3,
      height: 150,
      width: 180,
    },
    contactContainer: {
      marginLeft: 5,
      marginTop: 2,
      height: 150,
      width: 180,
      
    },
    policyContainer: {
      marginTop: 2,
      height: 150,
      width: 180,
    },
    termsContainer: {
      marginTop: 2,
      height: 150,
      width: 180,

    },
    textProp:{
      paddingTop:5,
        fontSize: 20,
        color: '#bbbbbb',
        fontWeight: 'bold'
  
    },
      
      Text2: {
        paddingTop: 10,
        alignItems: 'flex-start',
        fontSize: 14,
        color: Colors.primaryColor,
  
      },
      
});

export default FAQScreen;