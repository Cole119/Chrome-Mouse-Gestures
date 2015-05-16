function Painter() {

    var gestureContainer;
    var gestureSVG;
    var gesturePolyline;
    var SVGNamespaceURI = "http://www.w3.org/2000/svg";
    var directionContainer;
    var directionDiv;
    var previewDiv;

    this.drawGesture = function(x, y) {
        if (!document.getElementById("gesture-container")) {
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
    };

    this.updateDirectionText = function(text) {
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
        directionDiv.innerText = text;
        //var margin = "-" + directionDiv.clientHeight / 2 + "px 0 0 -" + directionDiv.clientWidth / 2 + "px";
        directionDiv.style.margin = "-" + directionDiv.offsetHeight / 2 + "px 0 0 -" + directionDiv.offsetWidth / 2 + "px";
    };

    this.updateDescriptionText = function(text) {
        previewDiv.style.visibility = text ? "visible" : "hidden";
        previewDiv.innerText = text;
        //margin = "0 0 0 -" + previewDiv.clientWidth / 2 + "px";
        previewDiv.style.marginLeft = "-" + previewDiv.offsetWidth / 2 + "px";
    };

    this.clearGesture = function() {
        if (gestureContainer) {
            gestureContainer.parentNode.removeChild(gestureContainer);
            gestureContainer = undefined;
        }

        if (directionContainer) {
            directionContainer.parentNode.removeChild(directionContainer);
            directionContainer = undefined;
        }
    };
}