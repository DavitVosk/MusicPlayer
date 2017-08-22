import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import AllSingers from './components/AllSingers';
import SingerSongs from './components/SingerSongs';
import Player from './components/Player';
import TAB_BAR from './components/reused/NavBar';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const TAB_BAR_HEIGHT = SCREEN_HEIGHT / 10;

class App extends Component {
	render () {

		const commonProps = {
			hideNavBar: true,
		};

		// key => component parent
		const ScenesStructure = {
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