var backendList = [];
var checkboxList = [];
var counter = 0;

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
    checkbox.type = 'checkbox';
    checkbox.class = 'checkboxes';
    checkbox.setAttribute('for', 'liItem' + counter.toString());
    checkbox.setAttribute('id','checkboxes' + counter.toString());
    // checkbox.setAttribute('checked', '');
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
    backendList.push(text);
    checkboxList.push(checkbox);
    console.log(checkboxList);
    chrome.storage.sync.set({list: backendList, checkList: checkboxList}, function() {
        // console.log('here is the value: ' + list );
        console.log('here is the checkboxlist: ' + checkboxList);
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
    chrome.storage.sync.get({list: []}, function() {
        for(var i = 0; i < list.length; i++) {
            backendList[i] = list[i];
        }
    })
    chrome.storage.sync.get({
        list: [],
        checkboxList: []
    }, function(result) {
        text = result.list;
        checklist = result.checkboxList;
        for(var i = 0; i < text.length; i++) {
            var li = document.createElement('li');
            li.id = 'liItem' + i.toString();
            var checkbox = document.createElement('input');
            checkbox.id = 'checkbox' + i.toString();
            checkbox.class = 'checkboxClass';
            console.log('checkboxid: ' + checkbox.id);
            checkbox.type = 'checkbox';
            checkbox.class = 'checkboxes';
            checkbox.htmlFor = 'liItem' + i.toString();
            li.appendChild(checkbox);
            backendList[i] = text[i];
            checkboxList[i] =checklist[i];
            // console.log('backendList: ' + backendList[i]);
            // console.log('checkboxList: ' + checkboxList[i]);
            li.appendChild(document.createTextNode(backendList[i]));
            ul.appendChild(li);
            // counter++;
        }
        console.log(checkboxList);
        // console.log('backend array: ' + backendList);
    });
}
//when each checkbox is checked
// document.getElementsByClassName('checkboxes').onchange = function () {
//     console.log('afasdfas');
//     for(var i = 0; i < checkboxList.length; i++) {
//         if(document.getElementById('liItem' + i.toString()).checked) {
//             document.getElementById('liItem' + i.toString()).style.textDecoration = 'line-through';
//         } else {
//             document.getElementById('liItem' + i.toString()).style.textDecoration = 'none';
//         }
//     }
// }

if(document.getElementById('checkboxes0')) {
    document.getElementById('checkboxes0').onchange = function() {
        document.getElementById('checkboxes0').style.textDecoration = 'line-through';
        if(document.getElementById('checkboxes0').checked === false) {
            document.getElementById('checkboxes0').style.textDecoration = 'none';
        }
    }
}

//for when checkbox is checked, single test case only
// document.getElementById('testBox').onchange = function() {
//     document.getElementById('testString').style.textDecoration = 'line-through';
//     if(document.getElementById('testBox').checked === false) {
//         document.getElementById('testString').style.textDecoration = 'none';
//     }
// }