import React,{ Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

const SCREEN_HEIGHT= Dimensions.get('window').height;
const TAB_BAR_HEIGHT= SCREEN_HEIGHT / 15;

export default ({title})=> {
	return(
		<View style={styles.container}>
			<Text style={styles.text}>{title}</Text>
		</View>
	)
}

const styles = {
	container:{
		height: 50,
		backgroundColor: 'white',
		justifyContent:'center'
	},
	text:{
		textAlign:'center',
		fontSize:20,
		fontWeight:'bold'
	}
};