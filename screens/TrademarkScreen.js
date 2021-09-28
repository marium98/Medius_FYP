import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Alertcls } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Text, RadioButton, TextInput, Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Color';
import * as DocumentPicker from 'expo-document-picker';
import RegistrationRadio from '../components/RadioButton';
import * as yup from 'yup';
import { Formik } from 'formik';
import Loader from '../components/Loader';
import { INFORMATION, Information } from '../data/dummy-data';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../components/DropDown';
import { ADD_CASE } from '../constants/actions';
import { customisedAction } from '../redux/actions';


const phoneRegExp = RegExp(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/);
const loginValidationSchema = yup.object().shape({

  title: yup
    .string()
    .required('Title is Required'),
  technology: yup
    .string()
    .required('Technology is Required'),
  claims: yup
    .number('Number of claims must be a number')
    .typeError('Number of claims must be a number')
    .max(50, ({ max }) => `Please enter a number less than 50`)
    .required('Number of claims is Required')
    .positive('Number of claims must be positive')
    .integer('Number of claims must be a number'),
  number: yup
    .string().matches(phoneRegExp, 'Phone number is not valid')
    .required('Cellphone number is Required'),
  city: yup
    .string()
    .required('City is Required'),
})

//used hooks
const TrademarkScreen = props => {
  const loading = useSelector(({ casesReducer }) => casesReducer.loading)
  const session = useSelector(({ sessionReducer }) => sessionReducer.session)
  const [term, setTerm] = React.useState('first');
  const [fileName, setfileName] = useState("No file selected");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedClaim, setSelectedClaim] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [ModeofRegistration, setModeofRegistration] = useState(1)
  const [formData, setFormData] = useState(null);
  const cities = useSelector(({ genericDataReducer }) => genericDataReducer.cities)
  const categories = useSelector(({ genericDataReducer }) => genericDataReducer.categories)
  const claims = useSelector(({ genericDataReducer }) => genericDataReducer.claims)
  const dispatch = useDispatch()
  // api calling get cities

  useEffect(() => {
    // console.log(INFORMATION);
    // console.log(props.navigation.state.params);
    const { params } = props.navigation.state
    if (params) {
      const { id } = params
      if (id && INFORMATION && INFORMATION.length) {
        let data = INFORMATION.filter(info => info.caseId === id)
        if (data && data.length)
          setFormData(data[0])
      }

    }
  }, [props.navigation.state.params])

  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'jpg': return 'image/jpeg';
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
    }
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: false
    });
    console.log(result.uri);
    setfileName(result.name)
    setSelectedFile(result)
    console.log(result);
  }

  return (

    <Provider>
       <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.containerStyle}>

          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{ title: '', number: '', technology: '', claims: '', city: '' }}
            onSubmit={values => console.log(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <View style={styles.Trademark}>
                  {/* form fields */}
                  <View style={styles.searchSection}>
                    <TextInput
                      style={styles.input}
                      label="BrandName"
                      name="title"
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      theme={{
                        colors: {
                          text: 'black', primary: Colors.primaryColor,
                          underlineColor: 'transparent',
                        }
                      }}
                    />
                    {(errors.title && touched.title) &&
                      <Text style={styles.errorTextStyle}>{errors.title}</Text>
                    }
                  </View>

                  <View style={styles.searchSection}>
                    <DropDown
                      data={categories}
                      initValue="Select Category"
                      onChange={(option) => { setSelectedCategory(option) }}
                      style={styles.input}
                      placeholder="Select Category"
                      value={selectedCategory.label}
                    />
                  </View>
                  <View style={styles.searchSection}>
                    <RegistrationRadio
                      value={ModeofRegistration}
                      setValue={(x) => setModeofRegistration(x)}
                    />
                  </View>
                  <View style={styles.searchSection}>
                    <DropDown
                      data={claims}
                      initValue="Select Claim"
                      onChange={(option) => { setSelectedClaim(option) }}
                      style={styles.input}
                      placeholder="Select Claim"
                      value={selectedClaim.label}
                    />
                  </View>

                  <View style={styles.searchSection}>
                    <DropDown
                      data={cities}
                      initValue="Select City"
                      onChange={(option) => { setSelectedCity(option) }}
                      style={styles.input}
                      placeholder="Select City"
                      value={selectedCity.label}
                    />
                  </View>
                  <View style={styles.searchSection}>
                    <TextInput
                      label="Cellphone"
                      style={styles.input}
                      name="number"
                      keyboardType="numeric"
                      theme={{
                        colors: {
                          text: 'black', primary: Colors.primaryColor,
                          underlineColor: 'transparent',
                        }
                      }}
                      onChangeText={handleChange('number')}
                      onBlur={handleBlur('number')}
                      value={values.number}
                    />
                    {(errors.number && touched.number) &&
                      <Text style={styles.errorTextStyle}>{errors.number}</Text>
                    }
                  </View>

                  <View style={styles.searchSection}>
                    <Text style={styles.txt}>Upload documents in PDF format</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                    <Text style={styles.txt}>{fileName}</Text>
                    <TouchableOpacity onPress={pickDocument} style={styles.uploadContainer}>
                      <Text style={styles.upload}>Upload</Text>

                    </TouchableOpacity>

                  </View>
                  <View style={styles.searchSection}>
                    <RadioButton.Group onValueChange={newValue => setTerm(newValue)}  >
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.txt}>I agree to all terms and conditions</Text>
                        <RadioButton value="Normal Registration" />

                      </View>
                    </RadioButton.Group>
                  </View>
                  <View style={styles.searchSection}>

                    <TouchableOpacity
                      onPress={
                        () => {

                          const formData = new FormData();
                          formData.append('Title', values.title);
                          formData.append('Type', 2);
                          formData.append('Contact', values.number);
                          formData.append('ModeofRegistration', ModeofRegistration);
                          if (selectedFile) {
                            const extArr = /\.(\w+)$/.exec(selectedFile.name);
                            const type = getMimeType(extArr[1]);
                            formData.append('Document', { uri: selectedFile.uri, name: selectedFile.name, type });
                          }
                          formData.append('CityId', selectedCity.key);
                          formData.append('ClaimId', selectedClaim.key);
                          formData.append('IpFilterId', selectedCategory.key);
                          formData.append('UserId', session.id);
                          formData.append('ModifiedBy', session.id);
                          dispatch(customisedAction(ADD_CASE, {
                            data: formData,
                            navigation: props.navigation
                          }))
                        }
                      }
                      style={styles.appButtonContainer}
                    >
                      <Text style={styles.appButtonText}>Register</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </SafeAreaView>
      </ScrollView>
    </Provider>

  );
};

TrademarkScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Trademark Registration',
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
  textStyle: {
    justifyContent: 'center',
    margin: 30,
    padding: 4
  },
  radText: {
    fontSize: 14,
    paddingTop: 3,

  },
  containerStyle: {
    marginHorizontal: 20,

  },
  agree: {

    fontSize: 18,
  },
  txt: {
    // paddingTop: 3,
    // height: 20,
    margin: 10,
    fontSize: 16
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 14,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    margin: 10,
    fontSize: 16,
    // backgroundColor: 'white' 
  },
  upload: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    color: 'white'
  },
  uploadContainer: {
    marginTop: 8,
    marginLeft: 250,
    marginRight: 10,
    elevation: 2,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    padding: 11,
  },
  appButtonContainer: {
    marginTop: 8,
    marginLeft: 120,
    marginRight: 110,
    marginBottom: 20,
    elevation: 8,
    backgroundColor: Colors.primaryColor,
    borderRadius: 17,
    padding: 11,

  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  searchSection: {
    justifyContent: 'center',
  },

});

export default TrademarkScreen;
