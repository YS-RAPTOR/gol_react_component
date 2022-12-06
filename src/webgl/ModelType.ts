import { getClientBuildManifest } from "next/dist/client/route-loader";
import GLD from "./GLDriver";
import ModelShader from "./Shaders/ModelShader";

export default class ModelType {
  vertices: Float32Array;
  indices: Uint16Array;
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;

  constructor(vertices : number[] , indices : number[] ) {
    this.vertices = new Float32Array(vertices);
    this.indices = new Uint16Array(indices);
    this.vertexBuffer = WebGLBuffer;
    this.indexBuffer = WebGLBuffer;

    this._genVertexBuffer();
    this._genIndexBuffer();
  }

  _genVertexBuffer() {
    this.vertexBuffer = GLD.createBuffer();
    GLD.bindBuffer(this.vertexBuffer, )
    GLD.addBufferData(this.vertices);
    GLD.unbindBuffer(this.vertexBuffer);
  }

  _genIndexBuffer() {
    this.indexBuffer = GLD.createBuffer();
    GLD.bindElementBuffer(this.indexBuffer);
    GLD.addElementBufferData(this.indices);
    GLD.unbindElementBuffer(this.indexBuffer);
  }

  use = (shader : ModelShader) => {
    GLD.bindBuffer(this.vertexBuffer);
    shader.enablePositionAttribute();
    GLD.bindElementBuffer(this.indexBuffer);
  }
}
