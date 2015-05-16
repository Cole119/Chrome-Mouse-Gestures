function Painter() {

    var directionContainer;
    var directionDiv;
    var previewDiv;
    var canvas;
    var ctx;

    this.drawGesture = function(x, y) {
        if (!document.getElementById("gesture-canvas")) {
            canvas = document.createElement("canvas");
            canvas.id = "gesture-canvas";
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            (document.body || document.documentElement).appendChild(canvas);

            ctx = canvas.getContext('2d');
            ctx.strokeStyle = "rgb(18,89,199)";
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    this.updateDirectionText = function(text) {
        if (!document.getElementById("direction-container")) {
            directionContainer = document.createElement("div");
            directionContainer.id = "direction-container";

            directionGroupDiv = document.createElement("div");
            directionGroupDiv.id = "direction-group";
            directionDiv = document.createElement("div");
            directionDiv.className = "direction-div";
            directionDiv.style.display = "inline-block";
            previewDiv = document.createElement("div");
            previewDiv.className = "direction-div";

            directionGroupDiv.appendChild(directionDiv);
            directionGroupDiv.appendChild(previewDiv);
            directionContainer.appendChild(directionGroupDiv);

            (document.body || document.documentElement).appendChild(directionContainer);
        }
        directionDiv.innerText = text;
        directionDiv.style.margin = "-" + directionDiv.offsetHeight / 2 + "px 0 0 -" + directionDiv.offsetWidth / 2 + "px";
    };

    this.updateDescriptionText = function(text) {
        previewDiv.style.visibility = text ? "visible" : "hidden";
        previewDiv.innerText = text;
        previewDiv.style.marginLeft = "-" + previewDiv.offsetWidth / 2 + "px";
    };

    this.clearGesture = function() {
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            canvas = undefined;
        }

        if (directionContainer) {
            directionContainer.parentNode.removeChild(directionContainer);
            directionContainer = undefined;
        }
    };
}