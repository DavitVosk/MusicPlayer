import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Hideo } from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default ({ value, onChangeText, placeholder, iconName, secureTextEntry, errorMessage }) => {
	return (
		<View>
			<Hideo
				secureTextEntry={secureTextEntry}
				iconClass={MaterialIcons}
				iconName={iconName}
				iconColor={'#000000'}
				iconBackgroundColor={'#ffb0a8'}
				placeholder={placeholder}
				style={styles.field}
				onChangeText={onChangeText}
				value={value}
			/>
			<Text style={styles.error}>{errorMessage}</Text>
		</View>
	)
};

const styles = {
	field: {
		flex: 0,
		borderWidth: 1,
		borderColor: 'gray',
		marginVertical: 15
	},
	error:{
		color:'red'
	}
};
