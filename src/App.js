import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { persistStore, } from 'redux-persist'
import { Provider } from 'react-redux';
import RouterComponent from './Router';
import store from './reducers/store';
import LeftMenu from './components/menu/MenuWrapped';
import InitializeFirebase from './firebase/initialize_firebase';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = { rehydrated: false }
	}

	componentWillMount () {
		InitializeFirebase();

		persistStore(store, { storage: AsyncStorage, blacklist: ['menuOpen'] }, () => {
			this.setState({ rehydrated: true });
		});
	}

	render () {
		if ( ! this.state.rehydrated )
			return <View/>;
		return (
			<Provider store={store}>
				<LeftMenu>
					<RouterComponent/>
				</LeftMenu>
			</Provider>
		)
	}
}

export default App;