import React, { Component } from 'react';
import { View, Image, Dimensions, Text, TouchableHighlight } from 'react-native';
import InputField from './reused/InputField';
import Button from './reused/Button'
import * as validate from '../utils/validation/validation';

import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get("window");

class SignUpForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailError: '',
			passwordError: ''
		}
	}

	validateInput (input) {
		const { email, password } = this.state;

		if ( input === 'email' ) {
			const emailError = `${email} is not a valid email`;
			const isValid = validate.validate_email(email);

			if ( ! isValid ) {
				this.setState({ emailError })
			} else {
				this.setState({ emailError: '' })
			}
		}

		if ( input === 'password' ) {
			const passwordError = 'Your password must contain between 4 and 60 characters';
			const isValid = validate.validate_password(password);

			if ( ! isValid ) {
				this.setState({ passwordError })
			} else {
				this.setState({ passwordError: '' })
			}
		}
	}

	validateSignIN (email, pass) {
		const validated = validate.validate_signIN(email, pass);
		const inputs = ['email', 'password',];

		if ( validated ) {
			Actions.allSingers({ type: 'reset' });
		} else {
			return inputs.map(input => this.validateInput(input))
		}
	}

	render () {
		const { email, password, emailError, passwordError } = this.state;

		return (
			<Image source={require('../utils/images/background.png')} style={styles.container}>
				<InputField
					iconName={'email'}
					placeholder="E-mail"
					onChangeText={email => this.setState({ email })}
					value={email}
				/>
				<Text>{emailError}</Text>

				<InputField
					secureTextEntry
					iconName={'lock'}
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					value={password}
				/>
				<Text>{passwordError}</Text>


				<Button title="Sign In" onPress={this.validateSignIN.bind(this, email, password)}/>

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
	text: {
		textAlign: 'center',
		fontSize: 15,
		color: 'white'
	}
};

export default SignUpForm;