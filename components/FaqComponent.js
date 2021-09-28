import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Faq = ({index , Question, Answer }) => {
    const [showAns, setShowAns] = useState(false)
    
    return (
        <View key={index} style={styles.faq}>
            <TouchableOpacity
                onPress={() => setShowAns(!showAns)}
            >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text style={{ flex: 1, fontSize: 16 }}>{Question}</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 5 }} />
                </View>
            </TouchableOpacity>

          {
              showAns ? 
              <View style={{ padding: 10, borderTopWidth: 0.5, borderColor: '#949494' }}>
                <Text style={{ color: '#b1b1b1', fontSize: 16 }}>{Answer}</Text>
              </View> :
           null
          }

        </View>
    )

}

const styles = StyleSheet.create({
    faq: {
        // margin: 10,
        // borderRadius: 7,
        borderColor: '#949494',
        borderBottomWidth: 0.5,
        backgroundColor: 'white'

    }

})

export default Faq;