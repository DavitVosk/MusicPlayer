import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import AllSingers from './components/AllSingers';
import SingerSongs from './components/SingerSongs';
import Player from './components/Player';

class App extends Component {
	componentWillMount() {
	  firebase.initializeApp({
			apiKey: "AIzaSyDD0xLQkyiPzxExDzvr4gELoiuyD1JdEtU",
			authDomain: "music-player-15408.firebaseapp.com",
			databaseURL: "https://music-player-15408.firebaseio.com",
			projectId: "music-player-15408",
			storageBucket: "music-player-15408.appspot.com",
			messagingSenderId: "194930829591"
		})
	}

	render () {
		const commonProps = {
			hideNavBar: true,
		};

		// key => component parent
		const ScenesStructure = {
			signUp: { component: SignUpForm, ...commonProps },
			login: { component: LoginForm, ...commonProps },
			allSingers: { component: AllSingers, ...commonProps },
			singer: { component: SingerSongs, ...commonProps },
			player: { component: Player, ...commonProps, direction: "vertical" },
		};

		const Scenes = [];

		for (var key in ScenesStructure) {
			const SceneProps = ScenesStructure[key];

			Scenes.push(
				<Scene key={key} {...SceneProps} />
			);
		}

		return (
			<Router>
				{Scenes}
			</Router>
		)
	}
}

export default App;