var options = [
    { value: "Close tab", text: "Close Current Tab" },
    { value: "Go back", text: "Go Back" },
    { value: "Go forward", text: "Go Forward" }
];

// Saves options to localStorage.
function save_options() {
    var data = {};

    data["color"] = document.getElementById("stroke-color").value;
    var gestures = {};
    var rows = document.getElementsByClassName("gesture-row");
    // Skip the first row since it contains the headings
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].childNodes;
        var gesture = cells[0].firstChild.value;
        var select = cells[1].firstChild;
        var action = select.children[select.selectedIndex].value;

        if (gesture) {
            gestures[gesture.toUpperCase()] = action;
        }
    }
    data["gestures"] = gestures;

    chrome.storage.sync.clear();
    chrome.storage.sync.set(data, function () {
        if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
        }
    });

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    chrome.storage.sync.get(null, function (data) {
        var initialColor = data["color"];
        if(initialColor && initialColor != "undefined") {
            document.getElementById("stroke-color").value = initialColor;
        }
        var gestures = data["gestures"];
        for (var gesture in gestures) {
            var tr = newGesture();
            var cells = tr.childNodes;
            cells[0].firstChild.value = gesture;
            var select = cells[1].firstChild;
            for (var i = 0; i < select.children.length; i++) {
                var child = select.children[i];
                if (child.value == gestures[gesture]) {
                    child.selected = "true";
                    break;
                }
            }
        }
    });
}

function newGesture() {
    var tr = document.createElement("tr");
    tr.className = "gesture-row";
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var textbox = document.createElement("input");
    textbox.type = "text";
    td1.appendChild(textbox);

    var select = document.createElement("select");
    //for (var i = 0; i < options.length; i++) {
    //    var option = document.createElement("option");
    //    option.value = options[i].value;
    //    option.innerHTML = options[i].text;
    //    select.appendChild(option);
    //}
    for (name in nameToFunctionMap) {
        var option = document.createElement("option");
        option.value = name;
        option.innerHTML = name;
        select.appendChild(option);
    }
    td2.appendChild(select);

    tr.appendChild(td1);
    tr.appendChild(td2);
    document.getElementById("gestures-table-body").appendChild(tr);
    return tr;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector("#new-gesture").addEventListener("click", newGesture);