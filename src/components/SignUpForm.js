import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight } from 'react-native';
import InputFieldWithValidationError from './reused/InputField';
import Button from './reused/Button'
import * as validate from '../utils/validation/validation';
import { user_sign_up } from '../actions';

import { connect } from 'react-redux';
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

			isValid ? this.setState({ emailError: '' }) : this.setState({ emailError });
		}

		if ( input === 'password' ) {
			const passwordError = 'Your password must contain between 6 and 60 characters';
			const isValid = validate.validate_password(password);

			isValid ? this.setState({ passwordError: '' }) : this.setState({ passwordError });
		}

		if ( input === 'confirmPassword' ) {
			const confirmPasswordError = 'Your passwords must match';
			const isValid = validate.validate_password_confirmation(password, confirmPassword);

			isValid ? this.setState({ confirmPasswordError: '' }) : this.setState({ confirmPasswordError });
		}
	}

	validateSignUP (email, pass, confirmPass) {
		const validated = validate.validate_signUP(email, pass, confirmPass);
		const inputs = ['email', 'password', 'confirmPassword'];

		validated ? this.props.user_sign_up(email, pass) : inputs.map(input => this.validateInput(input));
	}

	render () {
		const { email, password, confirmPassword, emailError, passwordError, confirmPasswordError } = this.state;

		return (
			<Image source={require('../utils/images/background.png')} style={styles.container}>
				<InputFieldWithValidationError
					iconName={'email'}
					placeholder="E-mail"
					onChangeText={email => this.setState({ email })}
					value={email}
					errorMessage={emailError}
				/>

				<InputFieldWithValidationError
					secureTextEntry
					iconName={'lock'}
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					value={password}
					errorMessage={passwordError}
				/>

				<InputFieldWithValidationError
					secureTextEntry
					iconName={'lock-open'}
					placeholder="Confirm Password"
					onChangeText={confirmPassword => this.setState({ confirmPassword })}
					value={confirmPassword}
					errorMessage={confirmPasswordError}
				/>

				<Button title="Sign Up" onPress={this.validateSignUP.bind(this, email, password, confirmPassword)}/>

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
	},
};

export default connect(null, { user_sign_up })(SignUpForm);