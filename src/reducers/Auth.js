import {
	SIGN_IN_SUCCESS,
	SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	user: '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN_SUCCESS:
			let { user, email } = action.payload;
			return { ...INITIAL_STATE, email, user };
		case SIGN_OUT:
			return INITIAL_STATE
	}

	return state;
}