import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({onPress, name})=> {
	return(
		<Icon
			style={{marginHorizontal: 20}}
			onPress={onPress}
			name={name}
			size={40}
			color="#5E5D5C"/>
	)
}