import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Moment from 'moment';

const CaseGridTile = props => {
  // let TouchableCmp = TouchableOpacity;

  // if (Platform.OS === 'android' && Platform.Version >= 21) {
  //   TouchableCmp = TouchableNativeFeedback;
  // }
  Moment.locale('en');
  return (
    <View style={styles.gridItem}>
     
        <View style={styles.container}>
          <Text style={styles.title}>
            {props.id}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
          <Text style={styles.title} >
            {Moment(props.date).format('L')}
          </Text>
          <TouchableOpacity onPress = {() => props.navigation.navigate("Info" , {caseInfo: props.caseInfo}) } >
          <FontAwesome name="share-square-o" size={24} color="#25D366"  />
          </TouchableOpacity>
         
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    // flex: 1,
    margin: 10,
    height: 80,
    borderRadius: 7,
    overflow: Platform.OS == 'android' && Platform.Version >= 21 ? 'hidden' : 'visible'
  },
  container: {
    flex: 1,
    // borderRadius: 10,
    padding: 12,
    borderColor: '#949494',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    // fontFamily: 'OpenSansBold',
    fontSize: 20,
    textAlign: 'right'
  }
});

export default CaseGridTile;
