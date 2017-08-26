import React, { Component } from 'react';
import { View, Image, Dimensions, Text, TouchableHighlight } from 'react-native';
import InputField from './reused/InputField';
import Button from './reused/Button'
import {Actions} from 'react-native-router-flux';

const { width, height } = Dimensions.get("window");

class SignUpForm extends Component {
	constructor (props) {
		super(props);
		this.state = { email: '', password: '' }
	}

	render () {
		const { email, password } = this.state;

		return (
			<Image source={require('../utils/images/background.png')} style={styles.container}>
				<InputField
					iconName={'email'}
					placeholder="E-mail"
					onChangeText={email => this.setState({ email })}
					value={email}
				/>

				<InputField
					secureTextEntry
					iconName={'lock'}
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					value={password}
				/>

				<Button title="Sign In" onPress={()=> Actions.allSingers()}/>

				<TouchableHighlight onPress={() => Actions.pop()}>
					<Text style={styles.text}>Should Sign Up first ?</Text>
				</TouchableHighlight>

			</Image>
		)
	}
}

const styles = {
	container: {
		width,
		height,
		flex: 1,
		justifyContent: 'center'
	},
	text:{
		textAlign: 'center',
		fontSize: 15,
		color:'white'
	}
};

export default SignUpForm;