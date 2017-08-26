import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight } from 'react-native';
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
			confirmPassword: '',
			emailError: '',
			passwordError: '',
			confirmPasswordError: ''
		}
	}

	validateInput (input) {
		const { email, password, confirmPassword } = this.state;

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

		if ( input === 'confirmPassword' ) {
			const confirmPasswordError = 'Your passwords must match';
			const isValid = validate.validate_password_confirmation(password, confirmPassword);

			if ( ! isValid ) {
				this.setState({ confirmPasswordError })
			} else {
				this.setState({ confirmPasswordError: '' })
			}
		}
	}

	validateSignUp (email, pass, confirmPass) {
		const validated = validate.validate_signUP(email, pass, confirmPass);
		const inputs = ['email', 'password', 'confirmPassword'];

		if ( validated ) {
			Actions.allSingers({type:'reset'});
		} else {
			return inputs.map(input => this.validateInput(input))
		}

	}

	render () {
		const { email, password, confirmPassword, emailError, passwordError, confirmPasswordError } = this.state;

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

				<InputField
					secureTextEntry
					iconName={'lock-open'}
					placeholder="Confirm Password"
					onChangeText={confirmPassword => this.setState({ confirmPassword })}
					value={confirmPassword}
				/>
				<Text>{confirmPasswordError}</Text>

				<Button title="Sign Up" onPress={this.validateSignUp.bind(this, email, password, confirmPassword)}/>

				<TouchableHighlight onPress={() => Actions.login()}>
					<Text style={styles.text}>Already Signed Up ?</Text>
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