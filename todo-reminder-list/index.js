var backendList = [];
var checkboxList = [];
var counter = 0;

var itemList = [];

//when add button is clicked
document.getElementById('addButton').onclick = function() {
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    chrome.storage.sync.get(['counter'], function() {
        li.id = 'liItem' + counter;
        console.log('li.id: ' + li.id);
        counter++;
    });
    var text = document.getElementById('textInput').value;
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('for', 'liItem' + counter.toString());
    checkbox.setAttribute('id','checkboxes' + counter.toString());
    // checkbox.setAttribute('checked','false');
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
    itemList.push(li);
    backendList.push(text);
    checkboxList.push(checkbox);
    chrome.storage.sync.set({list: backendList, checkList: checkboxList}, function() {
        // console.log('here is the value: ' + list );
        // console.log('here is the checkboxlist: ' + JSON.stringify(checkboxList[0]));
        // console.log('backend: ' + backendList[0]);
    });
    document.getElementById("textInput").value = "";
}

//happens when removeArray button is clicked, for testing purposes
document.getElementById('removeButton').onclick = function () {
    chrome.storage.sync.clear();
    location.reload();
}

//happens when the popup loads
window.onload = function() {
    var ul = document.getElementById('list');
    var text = [];
    var checklist = [];
    chrome.storage.sync.get({list: [], checkList: []}, function() {
        for(var i = 0; i < list.length; i++) {
            backendList[i] = list[i];
            checkboxList[i] = checkList[i];
        }
        console.log('get checkboxList: ' + checkboxList[0]);
    })
    chrome.storage.sync.get({
        list: [],
        checkList: []
    }, function(result) {
        text = result.list;
        checklist = result.checkList;
        for(var i = 0; i < text.length; i++) {
            var li = document.createElement('li');
            li.id = 'liItem' + i.toString();
            var checkbox = document.createElement('input');
            checkbox.setAttribute('id', 'checkboxes' + i.toString());
            console.log('checkboxid: ' + checkbox.id);
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('for', 'liItem' + i.toString());
            // checkbox.setAttribute('checked', '');
            li.appendChild(checkbox);
            backendList[i] = text[i];
            //checkbox isnt saving anything
            // checkboxList[i] = checkList[i];
            // console.log('backendList: ' + backendList[i]);
            // console.log('checkboxList: ' + checkboxList[i]);
            li.appendChild(document.createTextNode(backendList[i]));
            ul.appendChild(li);
        }
        console.log(checkboxList);
        // console.log('backend array: ' + backendList);
    });
}

// if(document.getElementById('checkboxes0').checked) {
//     document.getElementById('checkboxes0').onchange = function() {
//         document.getElementById('checkboxes0').style.textDecoration = 'line-through';
//         if(document.getElementById('checkboxes0').checked === false) {
//             document.getElementById('checkboxes0').style.textDecoration = 'none';
//         }
//     }
// }

//for when checkbox is checked, single test case only
document.getElementById('testBox').onchange = function() {
    document.getElementById('testString').style.textDecoration = 'line-through';
    if(document.getElementById('testBox').checked === false) {
        document.getElementById('testString').style.textDecoration = 'none';
    }
}