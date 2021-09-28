import React, { useEffect } from 'react';
import {View , Text , StyleSheet , Image , TouchableOpacity , Platform} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Avatar} from 'react-native-elements';
import HeaderButton from '../components/HeaderButton';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Color';
import { NavigationActions } from 'react-navigation';
import Faq from '../components/FaqComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const QuestionScreen = props => {
  const faqs = useSelector(({genericDataReducer}) => genericDataReducer.faqs )
 useEffect(() => {
   console.log(faqs)
 }, [faqs])
    return(
      <ScrollView>
        <View style={styles.Question}>
          {faqs.map((faq , index) => <Faq
              index = {index}
              Question = {faq.question}
              Answer= {faq.answer}
             />)}
            
        </View>
        </ScrollView>
    );

};

QuestionScreen.navigationOptions = ({navData , navigation}) => {
    return {
      headerTitle: 'FAQs',
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
        onPress={() => navigation.goBack(null)} />  
  </HeaderButtons>
   ),
    };
  };
  

const styles = StyleSheet.create({
    Question:{
      marginTop: 10,
        flex: 1
    }
});

export default QuestionScreen;