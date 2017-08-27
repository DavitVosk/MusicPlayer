import {
	SIGN_UP_SUCCESS,
	SIGN_UP_FAIL,
	SIGN_IN_SUCCESS,
	SIGN_IN_FAIL,
	SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	user: '',
	signUpError: '',
	signInError: '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_UP_SUCCESS:
			let { user, email } = action.payload;
			return { ...INITIAL_STATE, email, user, };
		case SIGN_UP_FAIL:
			return { ...INITIAL_STATE, signUpError: action.payload };
		case SIGN_IN_SUCCESS:
			return { ...INITIAL_STATE, email: action.payload.email, user: action.payload.user };
		case SIGN_IN_FAIL:
			return { ...INITIAL_STATE, signInError: action.payload };
		case SIGN_OUT:
			return INITIAL_STATE
	}

	return state;
}