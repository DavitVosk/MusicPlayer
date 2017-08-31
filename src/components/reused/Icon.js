import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({ onPress, name, color, style }) => {
	return (
		<Icon
			style={[{ marginHorizontal: 20 }, style]}
			onPress={onPress}
			name={name}
			size={40}
			color={color ? color : "#5E5D5C"}/>
	)
}