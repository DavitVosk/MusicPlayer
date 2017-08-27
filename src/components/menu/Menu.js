import React, { Component } from 'react';
import { Text, View, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from '../reused/Icon';

import * as actions from '../../actions';

class Menu extends Component {
	_onSignOut () {
		this.props.toggleMenuVisibility({ event: 'onChange', isOpen: false });
		this.props.user_sign_out();
		Actions.login({ type: 'reset' });
	}

	render () {
		const { username } = this.props;
		return (
			<ScrollView style={styles.menu} contentContainerStyle={styles.contentContainer}>
				<View style={[styles.flexAligned, styles.rowContainer]}>
					<Icon name="md-home" color='#900'/>
					<Text style={styles.item}>Hi, {username}</Text>
				</View>
				<View style={[styles.flexAligned, styles.rowContainer]}>
					<Icon name="md-log-out" color='#900'/>
					<Text onPress={() => this._onSignOut()} style={styles.item}>SIGN OUT</Text>
				</View>
			</ScrollView>

		)
	}
}

const styles = {
	menu: {
		flex: 1,
		backgroundColor: '#0b0b0b',
		paddingTop: 20,
		paddingLeft: 20
	},
	item: {
		color: '#b0b0b0',
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'notoserif',
		paddingTop: 5,
		marginLeft: 12
	},
	flexAligned: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowContainer: {
		marginVertical: 7,
	},
};

const mapStateToProps = ({ auth }) => {
	return { username: auth.email };
}
export default connect(mapStateToProps, actions)(Menu);

