import { useEffect } from "react";
import GOLRender from "../webgl/GOLRender";

const GOLComponent = () => {
    useEffect(() => {
        const GOLCanvas = document.getElementById("GOL") as HTMLCanvasElement;
        if (!GOLCanvas) return;

        GOLCanvas.width = window.innerWidth;
        GOLCanvas.height = window.innerHeight;

        const GOL = new GOLRender(GOLCanvas, 4);

        // Setting up Event Listeners   

        addEventListener("mousemove", GOL.onMouseMove);
        addEventListener("mousedown", GOL.onMouseMove);
        addEventListener("mouseup", GOL.onMouseMove);

        if (navigator.maxTouchPoints > 0) {
            addEventListener("touchmove", GOL.onTouch);
            addEventListener("touchstart", GOL.onTouch);
            addEventListener("touchend", GOL.onTouchEnd);
            addEventListener("touchcancel", GOL.onTouchEnd);
        }

        addEventListener("resize", (event) => {
            GOLCanvas.width = window.innerWidth;
            GOLCanvas.height = window.innerHeight;
            GOL.resize();
        });

        GOL.render();
    }, []);

    return (
        <canvas
            id="GOL"
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default GOLComponent;
