//timer aspeect

var startButton = document.getElementById('start-button');
var resetButton = document.getElementById('reset-button');

//hours/minutes/seconds//
var hours = document.getElementById('hours');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');

//will be inited by setInterval()
//needed for clearInterval()
var startTimer = -1;

//decrement hours/minutes/seconds values accordingly
function timer() {
	//prevent negative numbers
	if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
		hours.value = 0;
		minutes.value = 0;
		seconds.value = 0;
		startButton.innerHTML = 'START';
		clearInterval(startTimer);
		startTimer = -1;
	} else if (seconds.value != 0) {
		seconds.value--;
	} else if (minutes.value != 0 && seconds.value == 0) {
		minutes.value--;
		seconds.value = 59;
	} else if (hours.value != 0 && minutes.value == 0) {
		hours.value--;
		minutes.value = 59;
		seconds.value = 59;
	}
	return;
}

//reset values to 0
function resetTimer() {
	hours.value = 0;
	minutes.value = 0;
	seconds.value = 0;
	clearInterval(startTimer);
}

function startPauseInterval() {
	//setInterval() calls a function to be executed every 1000 ms
	//start
	if (startTimer == -1) {
		startButton.innerHTML = 'PAUSE';
		startTimer = setInterval(timer, 1000);
	} else {
		//pause
		startButton.innerHTML = 'START';
		clearInterval(startTimer);
		startTimer = -1;
	}
}

//adding event listener to startButton/resetButton to do a function when clicked
startButton.addEventListener('click', startPauseInterval);
resetButton.addEventListener('click', resetTimer);

//notes apect
function fetchNotes() {
	document.querySelector('.new-notes').innerHTML = '';
	//sends this message to firebase.js when called
	chrome.runtime.sendMessage(
		{
			command: 'fetchNotes',
			data: { notes: '' }
		},
		(response) => {
			//listen for a response
			let notes = response.data;
			let nav = '<ul>';
			window.notes = [];
			for (const noteId in notes) {
				nav +=
					'<li data-noteId=' +
					noteId +
					'>' +
					notes[noteId].title +
					'<span id="delete" style="margin-left:15em">🧹</span> </li>';
				//saves to local window storage
				window.notes[noteId] = notes[noteId];
			}
			nav += '</ul>';
			document.querySelector('.new-notes').innerHTML = nav;

			//listen for click
			listenForClicks();
		}
	);
}

fetchNotes();

document.getElementById('create').addEventListener('click', function() {
	let title = document.querySelector('.createNote').innerText;
	console.log(title);
	let id = document.querySelector('.createNote').dataset.noteid;
	saveNote(id, title);
});

//save note to database
function saveNote(id, title) {
	if (!title) {
		alert('Enter a note');
		return false;
	}
	if (id == undefined) {
		id = 'EMPTY-AUTOGEN--';
	} else {
	}
	chrome.runtime.sendMessage(
		{
			command: 'postNote',
			data: { id: id, title: title }
		},
		(response) => {
			try {
				let obj = response;
				document.querySelector('.createNote').dataset.noteid = obj.id;
				localStorage.setItem('_notes_lastOpenPage', obj.id);
			} catch (e) {
				console.log(e);
			}
			fetchNotes();
		}
	);
}

//adds click event to delete span
function listenForClicks() {
	let lis = document.querySelectorAll('span');
	for (let i = 0; i < lis.length; i++) {
		lis[i].addEventListener('click', function() {
			deleteNote(document.querySelector('li'));

			// try {
			// 	id = document.getElementById('delete').dataset.noteid;
			// 	console.log({ id });
			// } catch (e) {
			// 	console.log(e);
			// }
		});
	}
}

function deleteNote(list) {
	id = list.dataset.noteid;
	console.log({ id });
	chrome.runtime.sendMessage({ command: 'deleteNote', data: { id: id } }, (response) => {
		//..
		fetchNotes();
	});
}
