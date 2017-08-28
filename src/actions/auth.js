import firebase from 'firebase';
import * as aT from './types';
import { Alert } from 'react-native';

export const user_sign_up = (email, password) => {
	return (dispatch) => {
		// firebase.auth().currentUser.sendEmailVerification(email)
		// 	.then(()=> Alert.alert('sent'))
		// 	.catch((error)=> Alert.alert(error.message))
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => handleEmailVerification(user))
			.catch((error) => Alert.alert('', error.message,))
	}
};

const handleEmailVerification = (user) => {
	Alert.alert('', 'Verification mail is sent to your mentioned email, please verify it for further sign in');
	user.sendEmailVerification()
};

export const user_sign_in = (email, password) => {
	return (dispatch) => {
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(user => user.emailVerified ? dispatch({ type: aT.SIGN_IN_SUCCESS, payload: { user, email } })
					: Alert.alert('Please first verify your email',))
				.catch((error) => Alert.alert('', error.message,))
	}
};

export const user_sign_out = () => {
	return {type: aT.SIGN_OUT}
};
