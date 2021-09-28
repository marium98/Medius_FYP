import React ,{ useState , useEffect } from 'react';
import {TextInput} from 'react-native-paper';
import Colors from '../constants/Color';
import ModalSelector from 'react-native-modal-selector';

const DropDown = ({data,initValue,onChange,style,placeholder,value}) => {
    return(
        <ModalSelector
                    data={data}
                    initValue= {initValue}
                    supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    optionTextStyle = {{color: Colors.primaryColor}}
                    onChange={(option)=> onChange(option)}>
 
                    <TextInput
                        style={style}
                        editable={false}
                        placeholder={placeholder}
                        value={value} />

        </ModalSelector>

    );
}

export default DropDown;

