import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from './Icon';

export default ({ title, iconName, onPress }) => {
	return (
		<View style={typeof(iconName) === 'undefined' ? styles.container : styles.containerWithIcon}>
			<Icon
				name={iconName}
				onPress={onPress}
				style={styles.icon}/>

			<View style={{flex:1, alignSelf:'center'}}>
				<Text style={[styles.text]}>{title}</Text>
			</View>
		</View>
	)
}

const styles = {
	container: {
		height: 50,
		backgroundColor: 'white',
	},
	containerWithIcon: {
		height: 50,
		backgroundColor: 'white',
		flexDirection: 'row'
	},
	text: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold'
	},
	icon:{
		marginRight:0,
		marginLeft:15
	},
	c: {
		borderColor: 'red',
		borderWidth: 1
	}
};