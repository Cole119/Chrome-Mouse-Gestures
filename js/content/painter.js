function Painter() {

    var directionContainer;
    var directionDiv;
    var previewDiv;
    var canvas;
    var ctx;
    var lastX, lastY;
    var points = [];

    function getMidpoint(p1, p2) {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
    }

    function wipeCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function initializeCanvas() {
        var canvas = document.createElement("canvas");
        canvas.id = "gesture-canvas";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.className = "no-inherit";

        return canvas;
    }

    function drawCurve() {
        // We need at least 3 points to make a smooth curve.
        if (points.length < 3) {
            return;
        }

        wipeCanvas();

        ctx.beginPath();
        // Move the 'pencil' to the first point
        ctx.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length - 2; i++) {
            var midpoint = getMidpoint(points[i], points[i+1]);
            ctx.quadraticCurveTo(points[i].x, points[i].y, midpoint.x, midpoint.y);
        }

        // curve through the last two points
        ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x, points[i+1].y);

        ctx.stroke();
    }

    this.drawGesture = function(x, y) {
        points.push({x: x, y: y});

        if (!canvas) {
            canvas = initializeCanvas();
            (document.body || document.documentElement).appendChild(canvas);

            ctx = canvas.getContext('2d');
            ctx.strokeStyle = 'rgb(18,89,199)';
            //ctx.translate(0.5, 0.5);
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 3;
        }

        drawCurve();
    };

    this.updateDirectionText = function(text) {
        if (!document.getElementById("direction-container")) {
            directionContainer = document.createElement("div");
            directionContainer.id = "direction-container";
            directionContainer.className = "no-inherit";

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

        points = [];
    };
}