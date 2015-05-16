var pressed = false;
var minMoveDist = 10;
var debug = false;
var startX = 0, startY = 0, lastX = 0, lastY = 0;
var currentGesture = "";
var lastDirection = "";
var suppressContextMenu = false;
var painter = new Painter();

function init() {
    window.addEventListener("mousedown", clickHandler, false);
    window.addEventListener("mousemove", moveHandler, false);
    window.addEventListener("mouseup", clickHandler, false);
    window.addEventListener("contextmenu", menuHandler, false);
}

function resetGesture() {
    startX = 0;
    startY = 0;
    lastX = 0;
    lastY = 0;
    currentGesture = "";
    lastDirection = "";
}

function menuHandler(e) {
    if (suppressContextMenu) {
        e.preventDefault();
        suppressContextMenu = false;
    }
}

function clickHandler(e) {
    switch (e.type) {
        case "mousedown":
            if (e.button == 2) {
                if (debug) {
                    console.log("mousedown");
                }

                pressed = true;
                startX = e.clientX;
                startY = e.clientY;
                lastX = startX;
                lastY = startY;
            }
            break;

        case "mouseup":
            if (e.button == 2) {
                if (debug) {
                    console.log("mouseup");
                }

                pressed = false;
                
                if (debug) {
                    console.log(currentGesture);
                }

                painter.clearGesture();

                if (currentGesture) {
                    chrome.runtime.sendMessage({ type: "execute", gesture: currentGesture }, function (response) {
                        console.log("extension responded: " + response.action);
                    });
                }
                resetGesture();
            }
            break;
    }
}

function moveHandler(e) {
    if (pressed) {
        if (debug) {
            console.log("mousemove: (" + e.clientX + ", " + e.clientY + ")");
        }

        var newX = e.clientX;
        var newY = e.clientY;

        painter.drawGesture(newX, newY);

        var distanceX = Math.abs(newX - lastX);
        var distanceY = Math.abs(newY - lastY);

        if (distanceX < minMoveDist && distanceY < minMoveDist) return;

        suppressContextMenu = true;

        var newDirection = "";

        if (distanceX > distanceY) {
            newDirection = (newX > lastX ? "R" : "L");

        } else if (distanceX < distanceY) {
            newDirection = (newY > lastY ? "D" : "U");
        } else {
            return;
        }

        if (newDirection != lastDirection) {
            currentGesture += newDirection;
            lastDirection = newDirection;

            painter.updateDirectionText(currentGesture);

            chrome.runtime.sendMessage({ type: "preview", gesture: currentGesture }, function (response) {
                painter.updateDescriptionText(response.action)
            });
        }

        lastX = newX;
        lastY = newY;
    }
}

init();