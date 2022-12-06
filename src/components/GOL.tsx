import { useEffect } from "react";
import GOLRender from "../webgl/GOLRender";

let GOL = null;

const render = () => {
  window.requestAnimationFrame(render);
};

const GOLComponent = ({ width, height }: { width: number; height: number }) => {
  useEffect(() => {
    // Initialize WebGL context
    const GOLCanvas = document.getElementById("GOL") as HTMLCanvasElement;
    if (!GOLCanvas) return;

    const gl = GOLCanvas.getContext("webgl");
    if (!gl) return;

    GOL = new GOLRender(gl);
    GOL.render();
    console.log(GOL);
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
