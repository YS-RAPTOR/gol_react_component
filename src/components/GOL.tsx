import { useEffect } from "react";
import GOLRender from "../webgl/GOLRender";

let GOL = null;

const GOLComponent = ({ width, height }: { width: number; height: number }) => {
    useEffect(() => {
        // Initialize WebGL context
        const GOLCanvas = document.getElementById("GOL") as HTMLCanvasElement;
        if (!GOLCanvas) return;
        GOL = new GOLRender(GOLCanvas);

        // Setting up Event Listeners
        addEventListener("mousemove", GOL.onMouseMove);

        GOL.render();
    }, []);

    return (
        <canvas
            id="GOL"
            width={width}
            height={height}
            className="p1 border-2 border-black"
        />
    );
};

export default GOLComponent;
