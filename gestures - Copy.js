var pressed = false;

var gesture = {

    init: function () {
        window.addEventListener("mousedown", this.clickHandler, false);
        window.addEventListener("mousemove", this.moveHandler, false);
        window.addEventListener("mouseup", this.clickHandler, false);
    },

    clickHandler: function (e) {
        switch (e.type) {
            case "mousedown":
                if (e.button == 2) {
                    pressed = true;
                    console.log("mousedown");
                }
                break;

            case "mouseup":
                if (e.button == 2) {
                    pressed = false;
                    console.log("mouseup");
                }
                break;
        }
    },

    moveHandler: function (e) {
        if (pressed) {
            console.log("mousemove: (" + e.clientX + ", " + e.clientY + ")");
        }
    }
}

gesture.init();