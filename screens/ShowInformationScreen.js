import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Alertcls } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Text, RadioButton, TextInput, Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Color';
import { useDispatch, useSelector } from 'react-redux';

const ShowInformation = props => {

  const [formData, setFormData] = useState(null);
  const cities = useSelector(({ genericDataReducer }) => genericDataReducer.cities)
  const ipFilters = useSelector(({ genericDataReducer }) => genericDataReducer.ipFilters)
  const claims = useSelector(({ genericDataReducer }) => genericDataReducer.claims)
  const categories = useSelector(({ genericDataReducer }) => genericDataReducer.categories)

  useEffect(() => {

    const { params } = props.navigation.state
    if (params) {
      const { caseInfo } = params
      setFormData(caseInfo)
      console.log(ipFilters)
      console.log(caseInfo.ipFilterId)
      console.log(ipFilters.filter(city => city.key == caseInfo.ipFilterId));

    }
  }, [props.navigation.state.params]);

  return (
    <ScrollView>
      {formData ?
        <View style={{ flex: 1 }}>

          {formData.imagePath ?
            <View style={styles.searchSection}>

              <Image source={{ uri: formData.imagePath }} style={styles.image} resizeMode="contain" />
            </View> : null
          }
          <View style={styles.searchSection}>
            <Text style={styles.heading}>Brand Name</Text>
            <TextInput
              style={styles.input}
              editable={false}> {formData.title}</TextInput>
          </View>
          {formData.description ?
            <View style={styles.searchSection}>
              <Text style={styles.heading}>Description</Text>
              <TextInput
                style={styles.input}
                editable={false}> {formData.description}</TextInput>
            </View> : null
          }
          <View style={styles.searchSection}>
            <Text style={styles.heading}>Technology</Text>
            <TextInput
              style={styles.input}
              editable={false}>
              {ipFilters.filter(city => city.key == formData.ipFilterId).length ? ipFilters.filter(city => city.key == formData.ipFilterId)[0].label : 'Invalid Technology'}
            </TextInput>
          </View>
          {/* <View style={styles.searchSection}>
            <Text style={styles.heading}>Field</Text>
            <TextInput
              style={styles.input}
              editable={false}> {formData.field}</TextInput>
          </View> */}
          <View style={styles.searchSection}>
            <Text style={styles.heading}>No.Of Claims</Text>
            <TextInput
              style={styles.input}
              editable={false}> {formData.claimId}</TextInput>
          </View>
          <View style={styles.searchSection}>
            <Text style={styles.heading}>Contact</Text>
            <TextInput
              style={styles.input}
              editable={false}> {formData.contact}</TextInput>
          </View>
          <View style={styles.searchSection}>
            <Text style={styles.heading}>City</Text>
            <TextInput
              style={styles.input}
              editable={false}>
              {cities.filter(city => city.key == formData.cityId).length ? cities.filter(city => city.key == formData.cityId)[0].label : 'Invalid City'}</TextInput>
          </View>
          <View style={styles.searchSection}>
            <Text style={styles.heading}>Documents Uploaded</Text>
            <TextInput
              style={styles.input}
              editable={false}> {formData.documentPath ? formData.documentPath.replace('https://dinematebucket.s3.us-east-2.amazonaws.com/CaseDocuments/', '') : 'No document attached'}</TextInput>
          </View>
        </View>
        : <View>
          <Text>
            No data Available
          </Text>
        </View>}
    </ScrollView>
  );
};

ShowInformation.navigationOptions = navData => {
  return {
    headerTitle: 'Case Information',
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
  Trademark: {
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200
  },
  textStyle: {
    justifyContent: 'center',
    margin: 30,
    padding: 4
  },
  containerStyle: {
    marginHorizontal: 20,

  },
  heading: {
    margin: 10,
    marginBottom: 0,
    fontSize: 18,
    fontWeight: 'bold',

  },
  input: {
    height: 50,
    margin: 10,
    fontSize: 16,
    // backgroundColor: 'white' 
  },
  searchSection: {
    justifyContent: 'center',
  },

});

export default ShowInformation;