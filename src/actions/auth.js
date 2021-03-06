import firebase from 'firebase';
import * as aT from './types';
import { Alert } from 'react-native';

export const user_sign_up = (email, password) => {
	return (dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => handleEmailVerification(user))
			.catch((error) => Alert.alert('', error.message,))
	}
};

const handleEmailVerification = (user) => {
	Alert.alert('', 'Verification mail is sent to your email, please check');
	user.sendEmailVerification()
};

export const user_sign_in = (email, password) => {
	return (dispatch) => {
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(user => checkEmailVerification(user, dispatch, email))
				.catch((error) => Alert.alert('', error.message,))
	}
};

const checkEmailVerification = (user, dispatch, email) => {
	user.emailVerified ? dispatch({ type: aT.SIGN_IN_SUCCESS, payload: { user, email } })
		: Alert.alert('Please first verify your email',)
};

export const user_sign_out = () => {
	return {type: aT.SIGN_OUT}
};
