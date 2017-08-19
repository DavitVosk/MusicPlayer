import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import Slider from "react-native-slider";
import Data from '../Data';
import Icon from './reused/Icon';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height * 0.75;

class Player extends Component {
	constructor (props) {
		super(props);
		this.state = {
			songDuration: 0,
			currentTime: 0,
			play: true
		}
	}

	componentWillMount () {
		this.music = new Sound(
			'https://api.soundcloud.com/tracks/254196631/stream?client_id=8a754483a114344c70ab15f20a5035ab',
			'',
			(error) => {
				if ( error ) {
					console.log('failed to load the sound', error);
					return;
				}

				const songDuration = this.music.getDuration();
				this.setState({ songDuration });

				setInterval(() => {
					this.changeCurrentTime();
				}, 1000);

				// loaded successfully, play
				this.music.play((success) => {
					if ( success ) {
						console.log('successfully finished playing');
					} else {
						console.log('playback failed due to audio decoding errors');
					}
				});
			});
	}

	componentWillUpdate (nextProps, nextState) {
		nextState.currentTime > nextState.songDuration ? this.setState({ play: false }) : null;
	}

	changeCurrentTime = () => {
		this.music.getCurrentTime((seconds, isPlaying) => {
			this.setState({ currentTime: seconds });
			// console.log('seconds', seconds);
			// console.log('isPlaying', isPlaying);
		});
	};

	listenSongPrevChunk () {
		this.setState({ currentTime: this.state.currentTime - this.state.songDuration / 10 }, () => {
			this.music.setCurrentTime(this.state.currentTime)
		});
	};

	listenSongNextChunk () {
		this.setState({ currentTime: this.state.currentTime + this.state.songDuration / 10 }, () => {
			this.music.setCurrentTime(this.state.currentTime)
		});
	};

	handlePause () {
		this.setState({ play: false }, () => {
			this.music.pause()
		})
	}

	handlePlay () {
		this.setState({ play: true }, () => {
			this.music.play()
		})
	}

	handleTimeChange (value) {
		this.setState({ currentTime: value * this.state.songDuration }, () => {
			this.music.setCurrentTime(this.state.currentTime)
		});
	}

	render () {
		const playingSong = Data[0];

		const playOrPauseIcon = (
			this.state.play ?
				<Icon onPress={this.handlePause.bind(this)} name={"ios-pause"}/>
				:
				<Icon onPress={this.handlePlay.bind(this)} name={"ios-play"}/>
		);

		let songPercentage;
		this.state.songDuration !== 0 ? songPercentage = this.state.currentTime / this.state.songDuration : null;

		return (
			<View style={{ flex: 1 }}>
				<Image source={{ uri: playingSong.background }} style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}/>

				<Slider
					value={songPercentage}
					onValueChange={this.handleTimeChange.bind(this)}
					minimumTrackTintColor="red"
				/>

				<View style={styles.control}>
					{/*<Icon onPress={this.listenPreviousSong.bind(this)} name={"ios-skip-backward"}/>*/}
					<Icon onPress={this.listenSongPrevChunk.bind(this)} name={"md-arrow-dropleft"}/>
					{playOrPauseIcon}
					<Icon onPress={this.listenSongNextChunk.bind(this)} name={"md-arrow-dropright"}/>
					{/*<Icon onPress={this.listenNextSong.bind(this)} name={"ios-skip-forward"}/>*/}
				</View>
			</View>
		)
	}
}

const styles = {
	control: {
		flex:1,
		flexDirection: 'row',
		width: SCREEN_WIDTH,
		justifyContent: 'center',
	}
};

export default Player;