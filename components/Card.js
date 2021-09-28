import React from 'react';
import {View , StyleSheet} from 'react-native';
import Colors from '../constants/Color';

const Card = props => {
  return(
      <View style={{...styles.card , ...props.style}}>
          {props.children}
      </View>
  );
};

const styles = StyleSheet.create({
   
    card:{
        
        shadowColor: 'black',
        shadowOffset: {width:0 , height: 5},
        elevation: 6,
        shadowRadius: 2,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 19,
      

    },
});

export default Card;