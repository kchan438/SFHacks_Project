# SFHacks_Project 2021

## Inspiration
Getting lazy and unproductive, we wanted a one stop solution to help out with this!

## What it does
Built in timer that counts down
Notes aspect where notes sync to Firebase Realtime DB
Creates a To-Do List that can replace using sticky notes

## How we built it
Built using JS, HTML, CSS, and firebase

## Challenges we ran into
Many, one being synching up firebase and database to the notes, addingNotes functions and deleteNotes functions.
We also ran into challenges with the To-Do List in trying to remove a specific task out of the list as well as trying to get each task crossed out after the checkbox is checked.
Was not able to figure out how to allow the timer to run in the background, currently it only runs while the pop up is open. 
We ran into the challenges of being able to keep track of all the tabs in one window to see if you sway away from working on your designated task
Another challenge we ran into was trying to get a timer on our extension icon for when you close the popup menu and it will still tell you how much time is left on the timer.


## Accomplishments that we're proud of

Being able to get some of our designs onto a popup menu for the chrome extension. We're proud that even though we didn't get all of our features implemented, we did have the core features of the extension. We’re also proud that even though we didn’t successfully complete this project, we felt that we made a great team together.


## What we learned
How chrome extension work behind the hood/logic flow
Firebase functions, and how to initialize/deal with data
We learned how easy it is to implement a Chrome extension onto the browser but as far as the product goes it depends on what it is.
We also realized that Chrome extensions are mostly done in the frontend with some frontend JavaScript.


## What's next for chromeFriend
Clean up the UI
Add more functionality, like window detection and alerts when not on specified window
Add auth implementation with firebase and be able to track users
Add the feature of crossing out each task after the corresponding checkbox is checked.
Implementing a task removal feature in which the user can choose which task is removed from the list
Another feature to add is giving the user the power to edit each task if they misspell or update their tasks
Allow the pop up to be closed but still keep track of the time left on the timer
Maybe show time left remaining on the extension icon

