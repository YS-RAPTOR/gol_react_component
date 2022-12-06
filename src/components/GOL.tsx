import { useEffect } from "react";
import GLD from "../webgl/GLDriver";
import ModelType from "../webgl/ModelType";
import ModelRenderer from "../webgl/Render/ModelRenderer";
import Instance from "../webgl/Instance";
import ModelShader from "../webgl/Shaders/ModelShader";
import Attributes from "../webgl/Attributes";

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
    GLD.clear();

    const vertices = [-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0];
    const indices = [0, 1, 2, 1, 2, 3];
    const shader = new ModelShader(
      `
    attribute vec3 ${Attributes.POSITION};
    void main() {
      gl_Position = vec4(${Attributes.POSITION}, 1.0);
    }
    `,
      `
      void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `
    );

    const renderer = new ModelRenderer(shader);
    renderer.registerModel(new ModelType(vertices, indices), "triangle");
    renderer.addInstance(new Instance(), "triangle");
    renderer.render();
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

export default GOL;
