import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card } from 'react-native-elements';
import NavBar from './reused/NavBar';

import Data from '../Data';

class AllSingers extends Component {

	renderSinger (item) {
		return (
			<TouchableOpacity
				activeOpacity={.5}
				onPress={() => Actions.singer({ singer: item })}>
				<Card
					title={item.name}
					image={{ uri: item.background }}
				/>
			</TouchableOpacity>
		)
	}

	render () {
		return (
			<View style={styles.container}>
				<NavBar title='Artists'/>

				<FlatList
					data={Data}
					renderItem={({ item }) => this.renderSinger(item)}
					keyExtractor={(item, index) => index}
				/>
			</View>
		)
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'black'
	}
};

export default AllSingers;