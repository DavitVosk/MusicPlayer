import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import AllSingers from './components/AllSingers';
import SingerSongs from './components/SingerSongs';
import Player from './components/Player';

const commonProps = {
	hideNavBar: true,
};

// key => component parent
const ScenesStructure = {
	login: { component: LoginForm, ...commonProps },
	signUp: { component: SignUpForm, ...commonProps },
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

const RouterComponent = (props) => (
	<Router>
		{Scenes}
	</Router>
);

export default RouterComponent;