var backendList = [];
let counter = 0;
// window.onload = function () {
//     // var ul = document.getElementById('list');
//     // var li = document.createElement('li');
//     // for(var i = 0; i < backendList.length; i++) {
//     //     li.appendChild(document.createTextNode(backendList[i]));
//     //     ul.appendChild(li);
//     // }
//     // chrome.storage.local.get(['item'], function(result) {
//     //     console.log(result.key);
//     // })
// }


document.getElementById('addButton').onclick = function() {
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    var text = document.getElementById('textInput').value;
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
    // backendList.push(text);
    chrome.storage.sync.set({item: text}, function() {
        console.log('here is the value:' + text );
    });
    chrome.storage.sync.get(['item'], function(result) {
        console.log('here is the get value:' + result.item);
    });
    counter++;
    document.getElementById("textInput").value = "";
}

document.getElementById('list').onload = function() {
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    var text = '';
    chrome.storage.sync.get(['item'], function(result) {
        text = result.item;
        console.log('text: ' + text);
    });
    for(var i = 0; i < backendList.length; i++) {
        li.appendChild(document.createTextNode(text));
        ul.appendChild(li);
    }
}