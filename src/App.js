import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux';
import RouterComponent from './Router';
import store from './reducers/store';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = { rehydrated: false }
	}

	componentWillMount () {
		firebase.initializeApp({
			apiKey: "AIzaSyDD0xLQkyiPzxExDzvr4gELoiuyD1JdEtU",
			authDomain: "music-player-15408.firebaseapp.com",
			databaseURL: "https://music-player-15408.firebaseio.com",
			projectId: "music-player-15408",
			storageBucket: "music-player-15408.appspot.com",
			messagingSenderId: "194930829591"
		});

		persistStore(store, {storage: AsyncStorage}, () => {
			this.setState({ rehydrated: true });
		});
	}

	render () {
		if ( ! this.state.rehydrated )
			return <View/>;
		return (
			<Provider store={store}>
				<RouterComponent/>
			</Provider>
		)
	}
}

export default App;