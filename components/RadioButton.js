import React, {useState} from 'react';
import { View , StyleSheet } from 'react-native';
import { Text, RadioButton} from 'react-native-paper';

const RegistrationRadio = ({setValue , value}) => {

    return(
        <View>
            <Text style={styles.txt}>Application/Registration</Text>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <RadioButton value={2} />
                        <Text style={styles.radText}>Normal Registration (2000 Pkr)</Text>
                      </View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                        <RadioButton value={1} />
                        <Text style={styles.radText}>Fast Registration (5000 Pkr)</Text>
                      </View>
                    </RadioButton.Group>
        </View>
    )

}
const styles = StyleSheet.create({
    radText: {
        fontSize: 14,
        paddingTop: 3,
    
      },
      txt: {
        margin: 10,
        fontSize: 16
      },
})
export default RegistrationRadio;