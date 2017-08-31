import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	TouchableHighlight,
	Alert
} from 'react-native';
import InputFieldWithValidationError from './reused/InputField';
import Button from './reused/Button'
import * as validate from '../utils/validation/validation';
import { user_sign_in } from '../actions';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");

class SignInForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailError: '',
			passwordError: ''
		}
	}

	componentWillMount () {
		if ( this.props.user ) {
			Actions.allSingers({ type: 'reset' });
		}
	}

	componentWillUpdate (nextProps, nextState) {
		if ( nextProps.user )
			Actions.allSingers({ type: 'reset' });
	}

	validateInput (input) {
		const { email, password } = this.state;

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
	}

	validateSignIN (email, pass) {
		const validated = validate.validate_signIN(email, pass);
		const inputs = ['email', 'password',];

		validated ? this.props.user_sign_in(email, pass) : inputs.map(input => this.validateInput(input));
	}

	render () {
		const { email, password, emailError, passwordError } = this.state;

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

				<Button title="Sign In" onPress={this.validateSignIN.bind(this, email, password)}/>

				<TouchableHighlight onPress={() => Actions.signUp()}>
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
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 15,
		color: 'white'
	},
};

const mapStateToProps = ({ auth }) => {
	const { user } = auth;
	return { user }
};

export default connect(mapStateToProps, { user_sign_in })(SignInForm);