var backendList = [];
var checkboxList = [];
let counter = 0;

//when add button is clicked
document.getElementById('addButton').onclick = function() {
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    li.class = 'liItems';
    var text = document.getElementById('textInput').value;
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = 'value';
    checkbox.class = 'checkboxes';
    checkbox.htmlFor = 'liItems';
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
    backendList.push(text);
    checkboxList.push(checkbox);
    console.log(checkboxList);
    chrome.storage.sync.set({list: backendList, checkList: checkbooxList}, function() {
        // console.log('here is the value: ' + list );
        // console.log('here is the checkboxlist: ' + checkList);
        // console.log('backend: ' + backendList[0]);
    });
    document.getElementById("textInput").value = "";
}

//happens when the page loads
window.onload = function() {
    var ul = document.getElementById('list');
    var text = [];
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
        for(var i = 0; i < text.length; i++) {
            var li = document.createElement('li');
            li.id = 'liItem' + i.toString();
            var checkbox = document.createElement('input');
            checkbox.id = 'checkbox' + i.toString();
            checkbox.class = 'checkboxClass';
            console.log('checkboxid: ' + checkbox.id);
            checkbox.type = 'checkbox';
            checkbox.value = 'value';
            checkbox.class = 'checkboxes';
            checkbox.htmlFor = 'liItems';
            checkbox.checked = false;
            li.appendChild(checkbox);
            backendList[i] = text[i];
            // console.log('backendList: ' + backendList[i]);
            // console.log('checkboxList: ' + checkboxList[i]);
            li.appendChild(document.createTextNode(backendList[i]));
            ul.appendChild(li);
        }
        // console.log('backend array: ' + backendList);
    });
}

for(var i = 0; i < checkboxList.length; i++) {
    checkboxList[i].onchange = function () {
        for(var i = 0; i < checkboxList.length; i++) {
            if(document.getElementById('checkbox' + i.toString()).checked === true) {
                console.log('test');
                document.getElementById('checkbox' + i.toString()).style.textDecoration = 'line-through';
            }
        }
    };
}