import GLD from "../GLDriver";
import Attributes from "../Attributes";

export default class ModelShader{
  program: WebGLProgram;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  positionAttribute: number;

  constructor(vert: string, frag: string) {
    this.vertexShader = GLD.createVertexShader();
    GLD.addShaderSource(this.vertexShader, vert);
    GLD.compileShader(this.vertexShader);

    this.fragmentShader = GLD.createFragmentShader();
    GLD.addShaderSource(this.fragmentShader, frag);
    GLD.compileShader(this.fragmentShader);

    this.program = GLD.createProgram();
    GLD.attachShader(this.program, this.vertexShader);
    GLD.attachShader(this.program, this.fragmentShader);
    GLD.linkProgram(this.program);

    this.positionAttribute = GLD.getAttributeLocation(this.program, Attributes.POSITION);
  }

  use = () => {
    GLD.useProgram(this.program);
  }

  enablePositionAttribute = () => {
    GLD.enableVertexAttribArray(this.positionAttribute);
    GLD.pointToAttribute(this.positionAttribute, 3);
  }
}