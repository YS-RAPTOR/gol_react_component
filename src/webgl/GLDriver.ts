import { buffer } from "stream/consumers";

class GLDriver{
  gl? : WebGLRenderingContext;

  Init(gl: WebGLRenderingContext){
    this.gl = gl;
  }

  clear(){
    if(!this.gl) return;

    this.gl.clearColor(1, 1, 1, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  clearColor(r: number, g: number, b: number, a: number){
    if(!this.gl) return;

    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  
  }

  viewport = () => this.gl?.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  depthTest = (enable: boolean) => enable ? this.gl?.enable(this.gl.DEPTH_TEST) : this.gl?.disable(this.gl.DEPTH_TEST);

  createBuffer = () : WebGLBuffer => this.gl?.createBuffer() as WebGLBuffer;
  // Float Arrays
  bindBuffer = (buffer: WebGLBuffer) => this.gl?.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  unbindBuffer = (buffer: WebGLBuffer) => this.gl?.bindBuffer(this.gl.ARRAY_BUFFER, null);
  addBufferData = (data: Float32Array) => this.gl?.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

  // Uint Arrays
  bindElementBuffer = (buffer: WebGLBuffer) => this.gl?.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
  unbindElementBuffer = (buffer: WebGLBuffer) => this.gl?.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  addElementBufferData = (data: Uint16Array) => this.gl?.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

  // Shader Functions
  createVertexShader = () : WebGLShader => this.gl?.createShader(this.gl.VERTEX_SHADER) as WebGLShader;
  createFragmentShader = () : WebGLShader => this.gl?.createShader(this.gl.FRAGMENT_SHADER) as WebGLShader;

  addShaderSource = (shader: WebGLShader, source: string) => this.gl?.shaderSource(shader, source);
  compileShader = (shader: WebGLShader) => this.gl?.compileShader(shader);

  createProgram = () : WebGLProgram => this.gl?.createProgram() as WebGLProgram;
  attachShader = (program: WebGLProgram, shader: WebGLShader) => this.gl?.attachShader(program, shader);
  linkProgram = (program: WebGLProgram) => this.gl?.linkProgram(program);
  useProgram = (program: WebGLProgram) => this.gl?.useProgram(program);

  getAttributeLocation = (program: WebGLProgram, attribute: string) : number => this.gl?.getAttribLocation(program, attribute) as number;
  enableVertexAttribArray = (attribute: number) => this.gl?.enableVertexAttribArray(attribute);
  pointToAttribute = (attribute: number, dimensions: number) => this.gl?.vertexAttribPointer(attribute, dimensions, this.gl.FLOAT, false, 0, 0);

  DrawTriangles = (count: number) => this.gl?.drawElements(this.gl.TRIANGLES, count, this.gl.UNSIGNED_SHORT, 0);
}

const GLD = new GLDriver();

export default GLD;