import { combineReducers } from 'redux';
import Auth from './Auth';
import toggleMenuReducer from './menu_reducer';

export default combineReducers({
	auth: Auth,
	menuOpen: toggleMenuReducer,
})

