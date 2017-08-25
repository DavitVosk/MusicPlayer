import React, { Component } from 'react';
import { Hideo } from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default ({value, onChangeText, placeholder, iconName, secureTextEntry})=> {
	return(
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
	)
};

const styles = {
	field:{
		flex: 0,
		borderWidth: 1,
		borderColor: 'gray',
		marginVertical: 15
	}
};
