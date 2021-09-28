import React, { useEffect, useState } from 'react';
import {View , Text , StyleSheet , Button} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
// import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import HeaderButton from '../components/HeaderButton';
import StepIndicator from 'react-native-step-indicator';
import Colors from '../constants/Color';
import DropDown from '../components/DropDown';
import {INFORMATION,CASE} from '../data/dummy-data';
import { useSelector } from 'react-redux';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#25D366',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#25D366',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#25D366',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#25D366',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#25D366',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 20,
  currentStepLabelColor: '#25D366'
}
 

const RegistrationStatus = props => {
  const [caseId , setCaseId] = useState("");
  const [mapedCases , setCases] = useState([]); //jahn list ani hoti wahn array pass hota hy 
  const [caseProgress , setCaseProgress] = useState("");
  const cases = useSelector(({ casesReducer }) => casesReducer.cases)

  useEffect( () => {
    if(cases && cases.length){
      const temp = cases.map( (m , index) => {
        return {
          key: index , label: `${m.id } - ${m.title}`
        }
      } )
      setCases(temp);
    }
  }, [cases]);

  const showProgress = (selectedCase) => {
    setCaseId(selectedCase)
      if(selectedCase && cases && cases.length){
        const id = selectedCase.split(' - ')[0]
        const temp = cases.filter(m => m.id == id)[0].status
        setCaseProgress(temp)
        
      }

  }

  const stages = [
    'Request sent',
    'Request seen',
    'Request being processed',
    'Request sent to authorities',
    'Request result (Approved / Denied)'
  ];
    return(
      <View style={{flex: 1 , marginLeft: 15 , marginBottom: 100}}>
        <DropDown
          data={mapedCases}
          initValue="Select Case"
          onChange={(option)=>{ showProgress(option.label)}}
          style={styles.input}
          placeholder="Select Field"
          value={caseId}
        
        />

        <StepIndicator
         customStyles={customStyles}
         direction={'vertical'}
         currentPosition={caseProgress} //api sy current stage ka num pass hoga yahn
         labels={stages}
    />
</View>
        // <View style={styles.profile}>
        //     <Text>Welcome to Registration</Text>
        // </View> 
        
    );

};


RegistrationStatus.navigationOptions = navData => {
    return {
      headerTitle: 'Registration Status',
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
    profile:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
      height: 50,
      margin: 10,
      fontSize:16,
      // backgroundColor: 'white' 
    },
});

export default RegistrationStatus;