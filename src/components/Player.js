import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import Slider from "react-native-slider";
import Icon from './reused/Icon';
import NavBar from './reused/NavBar';

import { Actions } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height * 0.5;

class Player extends Component {
	constructor (props) {
		super(props);
		this.state = {
			song: this.props.song,
			songIndex: this.props.songIndex,
			songDuration: 0,
			currentTime: 0,
			play: true,
		}
	}

	playSong () {
		this.music ? this.music.stop() : null;

		this.music = new Sound(this.state.song.url, '', (error) => {
			if ( error ) {
				return;
			}

			const songDuration = this.music.getDuration();
			this.setState({ songDuration });

			this.changeCurrentTime();

			// loaded successfully, play
			this.music.play((success) => {
				if ( success ) {
					return this.state.songIndex === this.props.singer.songs.length - 1 ? this.music.stop() : this.changePlayingSongTo('next')
				} else {
					console.log('playback failed due to audio decoding errors');
				}
			});
		});
	}

	componentWillMount () {
		this.playSong();
	}

	// componentWillUpdate (nextProps, nextState) {
	// 	 nextState.currentTime > this.state.songDuration ? this.setState({ play: false }) : null;
	// 	 nextState.currentTime === this.state.songDuration ? this.changePlayingSongTo('next') : null;
	// }

	changeCurrentTime = () => {
		setInterval(() => {
			this.music.getCurrentTime((seconds, isPlaying) => {
				isPlaying ? this.setState({ currentTime: seconds }) : null;
			});
		}, 1000)
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

	changePlayingSongTo (anotherSong) {
		const { songs } = this.props.singer;
		const { songIndex } = this.state;
		const numberCompareWithSongIndex = anotherSong === 'next' ? songs.length - 1 : 0;
		const nextOrPrevSongIndex = anotherSong === 'next' ? songIndex + 1 : songIndex - 1;

		if ( songIndex === numberCompareWithSongIndex ) {
			this.setState({ play: true });
			this.playSong();
		} else {
			this.setState({ songIndex: nextOrPrevSongIndex, play: true }, () => {
				const song = songs.find((song, index) => {
					return index === this.state.songIndex;
				});

				this.setState({ song, currentTime: 0 }, () => {
					this.playSong();
				});
			})
		}
	}

	handlePauseAndPlay (play) {
		this.setState({ play }, () => {
			play ? this.music.play() : this.music.pause()
		})
	}

	handleTimeChange (value) {
		this.setState({ currentTime: value * this.state.songDuration }, () => {
			this.music.setCurrentTime(this.state.currentTime)
		});
	}

	stopPlayingAndGoBack () {
		this.music.stop();
		Actions.pop();
	}

	render () {
		const { singer } = this.props;

		const navBar = (
			<NavBar title={singer.name} iconName="ios-arrow-down" onPress={this.stopPlayingAndGoBack.bind(this)}/>
		);

		const playOrPauseIcon = (
			this.state.play ?
				<Icon onPress={this.handlePauseAndPlay.bind(this, false)} name={"ios-pause"}/>
				:
				<Icon onPress={this.handlePauseAndPlay.bind(this, true)} name={"ios-play"}/>
		);

		let songPercentage;
		this.state.songDuration !== 0 ? songPercentage = this.state.currentTime / this.state.songDuration : null;

		return (
			<View style={{ flex: 1 }}>
				{navBar}

				<Image source={{ uri: singer.background }} style={styles.image}/>

				<Slider
					value={songPercentage}
					onValueChange={this.handleTimeChange.bind(this)}
					minimumTrackTintColor="red"
				/>

				<View style={styles.controlButtonsContainer}>
					<Icon onPress={this.changePlayingSongTo.bind(this, 'prev')} name={"ios-skip-backward"}/>
					<Icon onPress={this.listenSongPrevChunk.bind(this)} name={"md-arrow-dropleft"}/>
					{playOrPauseIcon}
					<Icon onPress={this.listenSongNextChunk.bind(this)} name={"md-arrow-dropright"}/>
					<Icon onPress={this.changePlayingSongTo.bind(this, 'next')} name={"ios-skip-forward"}/>
				</View>
			</View>
		)
	}
}

const styles = {
	image: {
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH
	},
	controlButtonsContainer: {
		flex: 1,
		flexDirection: 'row',
		width: SCREEN_WIDTH,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingTop: 20
	}
};

export default Player;