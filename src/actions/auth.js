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
			.catch((error) =>  Alert.alert('', error.message,))
	}
};

const handleEmailVerification = (user)=> {
	Alert.alert('', 'Verification mail is sent to your mentioned email, please verify it for further sign in');
	user.sendEmailVerification()
};

export const user_sign_in = (email, password) => {
	return (dispatch) => {
		console.log( 'verified??', firebase.auth().currentUser.emailVerified );
		if(firebase.auth().currentUser.emailVerified){
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(user => dispatch({ type: aT.SIGN_IN_SUCCESS, payload: { user, email } }))
				.catch((error) =>  Alert.alert('', error.message,))
		}else{
			return Alert.alert('Please first verify your email address')
		}
	}
};

export const user_sign_out = () => {
	return {type: aT.SIGN_OUT}
};
