// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log({ firebase });
const firebaseConfig = {
	apiKey: 'AIzaSyDG6GiprBfgqaPcA4ULEjhnbxW8JxpdjhE',
	authDomain: 'todoproject-de5a5.firebaseapp.com',
	projectId: 'todoproject-de5a5',
	storageBucket: 'todoproject-de5a5.appspot.com',
	messagingSenderId: '239018769092',
	appId: '1:239018769092:web:ccb09349a3ccebd923a791',
	measurementId: 'G-VV73NYBBEK'
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

chrome.runtime.onMessage.addListener((msg, sender, response) => {
	if (msg.command == 'fetchNotes') {
		firebase.database().ref('/notes').once('value').then(function(snapshot) {
			response({ type: 'result', status: 'success', data: snapshot.val(), request: msg });
		});
	}

	if (msg.command == 'deleteNote') {
		let noteId = msg.data.id;
		if (noteId != '') {
			try {
				console.log(noteId);
				firebase.database().ref('/notes/' + noteId).remove();
				response({ type: 'result', status: 'success', id: noteId, request: msg });
			} catch (e) {
				console.log('error', e);
				response({ type: 'result', staus: 'error', data: e, request: msg });
			}
		}
	}
	if (msg.command == 'postNote') {
		let title = msg.data.title;
		let noteId = msg.data.id;
		try {
			if (noteId != 'EMPTY-AUTOGEN--') {
				let newNote = firebase.database().ref('/notes/' + noteId).update({
					title: title
				});
				response({ type: 'result', status: 'success', id: noteId, request: msg });
			} else {
				let newPostKey = firebase.database().ref().child('notes').push().key;
				let newNote = firebase.database().ref('/notes/' + newPostKey).set({
					title: title
				});
				console.log('newn note id', newPostKey);
				response({ type: 'result', status: 'success', id: noteId, request: msg });
			}
		} catch (e) {
			console.log('error', e);
			response({ type: 'result', status: 'error', data: e, request: msg });
		}
	}
	return true;
});
