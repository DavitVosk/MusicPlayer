import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ListView } from 'react-native';
import NavBar from './reused/NavBar';
import { Card, Avatar, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class SingerSongs extends Component {

	renderSongData = (song, songIndex) => {
		const {singer} = this.props;
		return (
			<TouchableOpacity onPress={() => Actions.player({ singer, song, songIndex })}>
				<ListItem
					title={song.title}
					subtitle={song.album}
					containerStyle={{ backgroundColor: 'white' }}
				/>
			</TouchableOpacity>
		)
	};

	render () {
		const { singer } = this.props;

		const navBar = (
			<NavBar title={singer.name} iconName="ios-arrow-back" onPress={() => Actions.pop()}/>
		);

		const avatar = (
			<View style={{ justifyContent: 'center', }}>
				<Card
					image={{ uri: singer.background }}
					style={{ zIndex: 5, }}
				>
				</Card>

				<View style={{ alignSelf: 'center', position: 'absolute', zIndex: 99, }}>
					<Avatar
						xlarge
						source={{ uri: singer.background }}
						activeOpacity={0.7}
						containerStyle={{}}
					/>
				</View>
			</View>
		);

		const songs = (
			<FlatList
				data={singer.songs}
				renderItem={({ item, index }) => this.renderSongData(item, index)}
				keyExtractor={(item, index) => index}
			/>
		);

		return (
			<View style={styles.container}>
				{navBar}
				{avatar}
				{songs}
			</View>
		)
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'black',
	}
};

export default SingerSongs;