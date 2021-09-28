import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';

const Notification = ({ index, title, subject, description, createdAt }) => {
    const [showAns, setShowAns] = useState(false)
    Moment.locale('en');
    return (
        <View key={index} style={styles.faq}>
            <TouchableOpacity
                onPress={() => setShowAns(!showAns)}
            >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text style={{ flex: 1, fontSize: 16 }}>{title}</Text>
                    <Text style={{ flex: 1, fontSize: 16 }}> {Moment(createdAt).format('L')}</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 5 }} />
                </View>
            </TouchableOpacity>

            {
                showAns ?
                    <View style={{ padding: 10, borderTopWidth: 0.5, borderColor: '#949494' }}>
                        <Text style={{ color: '#636363', fontSize: 16, fontWeight: 'bold' , marginBottom: 5 }}>{subject}</Text>
                        <Text style={{ color: '#b1b1b1', fontSize: 16 }}>{description}</Text>
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

export default Notification;