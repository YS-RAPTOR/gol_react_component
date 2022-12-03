import { useEffect } from "react";
import GLD from "../webgl/GLDriver";

const render = () => {
  window.requestAnimationFrame(render);
};

const GOL = ({ width, height }: { width: number; height: number }) => {
  useEffect(() => {
    // Initialize WebGL context
    const GOL = document.getElementById("GOL") as HTMLCanvasElement;
    if (!GOL) return;

    const gl = GOL.getContext("webgl");
    if (!gl) return;

    // Initialize shaders
    GLD.Init(gl);
    GLD.clear(1, 1, 1, 1);
    window.requestAnimationFrame(render);
  }, []);

  return (
    <canvas
      id="GOL"
      width={width}
      height={height}
      className="p1 border-2 border-black"
    ></canvas>
  );
};

export default GOL;
