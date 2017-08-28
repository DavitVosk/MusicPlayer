import firebase from 'firebase';

export default () => {
	return (
		firebase.initializeApp({
			apiKey: "AIzaSyDD0xLQkyiPzxExDzvr4gELoiuyD1JdEtU",
			authDomain: "music-player-15408.firebaseapp.com",
			databaseURL: "https://music-player-15408.firebaseio.com",
			projectId: "music-player-15408",
			storageBucket: "music-player-15408.appspot.com",
			messagingSenderId: "194930829591"
		})
	)
}
