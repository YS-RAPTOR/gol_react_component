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
