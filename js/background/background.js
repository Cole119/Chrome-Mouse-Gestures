//var actionMap = {
//    "DR": function () { closeCurrentTab(); },
//    "R": function () { navigateHistory(false); },
//    "L": function () { navigateHistory(true); }
//};

//var nameToFunctionMap = {
//    "Close tab": function () { closeCurrentTab(); },
//    "Go forward": function () { navigateHistory(false); },
//    "Go back": function () { navigateHistory(true); },
//    "Open new tab": function () { createNewTab(); }
//};

var gestureToNameMap;

//if (!gestureToNameMap) {
//    gestureToNameMap = {
//        "DR": "Close tab",
//        "R": "Go forward",
//        "L": "Go back"
//    };
//}

function loadSettings() {
    gestureToNameMap = {};
    chrome.storage.sync.get(null, function (data) {
        var gestures = data["gestures"];
        for (var gesture in gestures) {
            gestureToNameMap[gesture] = gestures[gesture];
        }
    });
}

loadSettings();

// Refresh the gesture configuration when the user updates their settings.
chrome.storage.onChanged.addListener(
    function (changes, areaName) {
        loadSettings();
    });

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      var gestureName = gestureToNameMap[request.gesture.toUpperCase()];
      if (request.type == "execute") {
        if (gestureName) {
            var action = nameToFunctionMap[gestureName];
            if (action) {
                action();
            }
        }
      } else if (request.type == "preview") {
          sendResponse({ action: gestureName });
      }
  });

function reloadCurrentTab(bypassCache) {
    chrome.tabs.reload({ bypassCache: bypassCache });
}

function navigateHistory(goBack) {
    var js = goBack ? "window.history.back()" : "window.history.forward()";
    chrome.tabs.executeScript({
        code: js
    });
}

function closeCurrentTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var current = tabs[0]
        chrome.tabs.remove(current.id);
    });
}

function createNewTab(url) {
    var properties = {};
    if (url) {
        properties.url = url;
    }
    chrome.tabs.create(properties);
}

function duplicateTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var current = tabs[0];
        chrome.tabs.duplicate(current.id);
    });
}

function reloadTab(bypassCache) {
    var reloadProperties = { bypassCache: bypassCache };
    chrome.tabs.reload(reloadProperties);
}

function takeScreenshot() {
    setTimeout(function () {
        chrome.tabs.captureVisibleTab(
            function (dataUrl) {
                createNewTab(dataUrl);
            })
    }, 100);
}