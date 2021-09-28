import React from 'react';
import {View , Text , Button , StyleSheet} from 'react-native';
import Colors from '../constants/Color';
import {Entypo} from '@expo/vector-icons';
import Card from '../components/Card';


const Header = props => {
   return(
       <View style = {styles.header}>
          
           <Text style = {styles.headerTitle} >
               {props.title}
              {props.Entypo}
           </Text>
           <View style= {styles.card}>
           <Card style= {styles.buttonConatiner}/>
           </View>
         
       </View>
      
      
   );
};

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 400,
        // paddingTop: 36,
        backgroundColor: Colors.primaryColor, //greencolorfyp //
        alignItems: 'stretch',
       justifyContent: 'center',
        paddingLeft:20,
        paddingTop: 300,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    headerTitle:{
      color: 'white',  //white
      fontSize: 30,
      alignItems: 'flex-start',
      justifyContent: 'center'

    },
    buttonConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 60,
         width: 600,
        maxWidth: '90%',
         height: 400,
      
        
    },
    card: {
        paddingLeft: 40,
        paddingRight: 20,
     
        // paddingBottom: 60,

        
    }





});

export default Header;