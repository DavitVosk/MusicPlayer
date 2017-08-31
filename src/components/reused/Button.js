import React from 'react';
import { Button } from 'react-native-elements';

export default ({ title, onPress }) => {
	return (
		<Button
			medium
			title={title}
			backgroundColor="#ffb0a8"
			color="black"
			buttonStyle={{ marginVertical: 20 }}
			onPress={onPress}
		/>
	)
}