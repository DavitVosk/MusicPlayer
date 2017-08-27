import firebase from 'firebase';
import * as aT from './types';
import { Alert } from 'react-native';


export const user_sign_up = (email, password) => {
	return (dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => dispatch({ type: aT.SIGN_UP_SUCCESS, payload: { user, email } }))
			.catch((error) =>  Alert.alert('', error.message,))
	}
};

export const user_sign_in = (email, password) => {
	return (dispatch) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => dispatch({ type: aT.SIGN_IN_SUCCESS, payload: { user, email } }))
			.catch((error) =>  Alert.alert('', error.message,))
	}
};

export const user_sign_out = () => {
	return {type: aT.SIGN_OUT}
};
