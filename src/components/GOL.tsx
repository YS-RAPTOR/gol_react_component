import { useEffect } from "react";
import GOLRender from "../webgl/GOLRender";


const GOLComponent = ({ width, height }: { width: number; height: number }) => {
    useEffect(() => {
        // Initialize WebGL context
        const GOLCanvas = document.getElementById("GOL") as HTMLCanvasElement;
        if (!GOLCanvas) return;

        const gl = GOLCanvas.getContext("webgl");
        if (!gl) return;
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
