import React from 'react';
import {Avatar} from 'react-native-elements';
import { useSelector } from 'react-redux';

const UserAvatar = () => {
    const session = useSelector(({ sessionReducer }) => sessionReducer.session)
    return(
        <Avatar
        size="small"
        overlayContainerStyle={{backgroundColor: 'orange'}}
        rounded
        title={session.firstName ? session.firstName[0]+session.lastName[0] : ''}
        activeOpacity={0.1}
        containerStyle={{flex: 1, marginRight: 10}}
       
       />
    );
}

export default UserAvatar