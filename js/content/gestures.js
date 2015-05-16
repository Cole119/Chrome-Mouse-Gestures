var pressed = false;
var minMoveDist = 10;
var debug = false;
var startX = 0, startY = 0, lastX = 0, lastY = 0;
var currentGesture = "";
var lastDirection = "";
var suppressContextMenu = false;
var gestureContainer;
var gestureSVG;
var gesturePolyline;
var SVGNamespaceURI = "http://www.w3.org/2000/svg";
var directionContainer;
var directionDiv;
var previewDiv;

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

                if (gestureContainer) {
                    gestureContainer.parentNode.removeChild(gestureContainer);
                    gestureContainer = undefined;
                }
				
				if (directionContainer) {
					directionContainer.parentNode.removeChild(directionContainer);
					directionContainer = undefined;
				}

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

        drawGesture(newX, newY);

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

            if (!document.getElementById("direction-container")) {
                directionContainer = document.createElement("div");
                directionContainer.id = "direction-container";
                //directionContainer.style.background = "transparent";
                //directionContainer.style.border = "none";
                //directionContainer.style.pointerEvents = "none";
                //directionContainer.style.position = "fixed";
                //directionContainer.style.zIndex = "2147483640";
                //directionContainer.style.width = "100%";
                //directionContainer.style.height = "100%";
                //directionContainer.style.top = "0";
                //directionContainer.style.left = "0";

                directionGroupDiv = document.createElement("div");
                directionGroupDiv.id = "direction-group";
                directionDiv = document.createElement("div");
                directionDiv.className = "direction-div";
                directionDiv.style.display = "inline-block";
                previewDiv = document.createElement("div");
                previewDiv.className = "direction-div";
                //previewDiv.style.top = "60%";

                //directionDiv.style.left = "50%";
                //directionDiv.style.top = "50%";
                //directionDiv.style.position = "absolute";
                //directionDiv.style.backgroundColor = "black";
                //directionDiv.style.color = "white";
                //directionDiv.style.opacity = "0.6";
                //directionDiv.style.fontSize = "3em";
                //directionDiv.style.borderStyle = "solid";
                //directionDiv.style.borderWidth = "5px";
                //directionDiv.style.borderColor = "black";

                directionGroupDiv.appendChild(directionDiv);
                directionGroupDiv.appendChild(previewDiv);
                directionContainer.appendChild(directionGroupDiv);
                //directionContainer.appendChild(previewDiv);

                (document.body || document.documentElement).appendChild(directionContainer);
            }
            directionDiv.innerText = currentGesture;
            //var margin = "-" + directionDiv.clientHeight / 2 + "px 0 0 -" + directionDiv.clientWidth / 2 + "px";
            directionDiv.style.margin = "-" + directionDiv.offsetHeight / 2 + "px 0 0 -" + directionDiv.offsetWidth / 2 + "px";

            chrome.runtime.sendMessage({ type: "preview", gesture: currentGesture }, function (response) {
                previewDiv.style.visibility = response.action ? "visible" : "hidden";
                previewDiv.innerText = response.action;
                //margin = "0 0 0 -" + previewDiv.clientWidth / 2 + "px";
                previewDiv.style.marginLeft = "-" + previewDiv.offsetWidth / 2 + "px";
            });
        }

        lastX = newX;
        lastY = newY;
    }
}

function drawGesture(x, y) {
    if(!document.getElementById("gesture-container")){
        gestureContainer = document.createElement("div");
        gestureContainer.id = "gesture-container";
        //gestureContainer.style.width = window.innerWidth + 'px';
        //gestureContainer.style.height = window.innerHeight + 'px';

        //gestureContainer.style.position= "fixed";
        //gestureContainer.style.left="0px";
        //gestureContainer.style.top="0px";
        //gestureContainer.style.display="block";
        //gestureContainer.style.zIndex= 2147483647;
        //gestureContainer.style.background="transparent";
        //gestureContainer.style.border="none";

        gestureSVG = document.createElementNS(SVGNamespaceURI, "svg");
        gesturePolyline = document.createElementNS(SVGNamespaceURI, "polyline");
        gesturePolyline.style.stroke = "rgb(18,89,199)";
        gesturePolyline.style.strokeOpacity = 1;
        gesturePolyline.style.strokeWidth = 3;
        gesturePolyline.style.fill = "none";

        gestureSVG.appendChild(gesturePolyline);
        gestureContainer.appendChild(gestureSVG);
        (document.body || document.documentElement).appendChild(gestureContainer);
    }
    var p = gestureSVG.createSVGPoint();
    p.x = x;
    p.y = y;
    gesturePolyline.points.appendItem(p);
}

init();