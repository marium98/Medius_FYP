import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Text, TextInput, Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Color';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CASE, PAYMENT } from '../constants/actions';
import { customisedAction } from '../redux/actions';
import Loader from '../components/Loader';


const PaymentScreen = props => {
  const loading = useSelector(({ casesReducer }) => casesReducer.loading)
  const session = useSelector(({ sessionReducer }) => sessionReducer.session)
  const [cardNumber, setCardNumber] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [caseId, setCaseId] = useState(null)
  const [mode, setMode] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const { params } = props.navigation.state
    if (params) {
      const { caseId, mode } = params
      setCaseId(caseId)
      setMode(mode)
    }
  }, [props.navigation.state.params]);


  return (
    <Provider>
       <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.containerStyle}>
          <View style={styles.Trademark}>

            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                label="Card"
                name="card"
                right={<TextInput.Icon name="credit-card" />}
                onChangeText={(text) => setCardNumber(text)}
                value={cardNumber}
                theme={{
                  colors: {
                    text: 'black', primary: Colors.primaryColor,
                    underlineColor: 'transparent',
                  }
                }}
              />
            </View>

            <View style={styles.searchSection}>
              <TextInput
                label="Expiry Month"
                name="expmonth"
                style={styles.input}
                theme={{
                  colors: {
                    text: 'black', primary: Colors.primaryColor,
                    underlineColor: 'transparent',
                  }
                }}
                onChangeText={(text) => setExpMonth(text)}
                value={expMonth}
              />
            </View>

            <View style={styles.searchSection}>
              <TextInput
                label="Expiry Year"
                style={styles.input}
                name="expyear"
                keyboardType="numeric"
                theme={{
                  colors: {
                    text: 'black', primary: Colors.primaryColor,
                    underlineColor: 'transparent',
                  }
                }}
                onChangeText={(text) => setExpYear(text)}
                value={expYear}
              />
            </View>

            <View style={styles.searchSection}>
              <TextInput
                label="CVC"
                style={styles.input}
                name="cvc"
                keyboardType="numeric"
                theme={{
                  colors: {
                    text: 'black', primary: Colors.primaryColor,
                    underlineColor: 'transparent',
                  }
                }}
                onChangeText={(text) => setCvc(text)}
                value={cvc}
              />
            </View>

            <View style={styles.searchSection}>

              <TouchableOpacity onPress={
                () =>
                  dispatch(customisedAction(PAYMENT, {
                    data: {
                      caseId,
                      userId: session.id,
                      mode,
                      stripeEmail: session.email,
                      cardNumber,
                      expMonth,
                      expYear,
                      cvc
                    },
                    navigation: props.navigation,
                    session
                  }
                  ))
              }
                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Pay Now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Provider>

  );

};

PaymentScreen.navigationOptions = ({ navData, navigation }) => {
  return {
    headerTitle: 'Payment',
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    // flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  Imagecontainer: {
    marginLeft: 8,
    // height: 82,
    // width: 82,
    overflow: 'hidden',
    // borderRadius: 40,
    // borderWidth: 1
  },
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
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
    marginLeft: 10,
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


export default PaymentScreen;