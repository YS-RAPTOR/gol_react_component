import Attributes from "./Attributes";

const indices = new Uint16Array([0, 1, 2, 1, 2, 3]);
const vertices = new Float32Array([-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]);

const vertexSource = `
attribute vec3 ${Attributes.POSITION};
void main() {
  gl_Position = vec4(${Attributes.POSITION}, 1.0);
}
`
const fragmentSource = `
void main(){
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

export default class GOLRender {
  // context
  gl : WebGLRenderingContext;
  // shaders
  program: WebGLProgram;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  // attributes and uniforms
  positionAttribute: number;
  // colorAttribute: number;
  // mouseUniform: WebGLUniformLocation;
  // stateUniform: WebGLUniformLocation;
  // nextStateUniform: WebGLUniformLocation;
  // Model
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;

  constructor(gl : WebGLRenderingContext) {
    // Getting the context
    this.gl = gl;

    // Creating the shaders
    this.vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    gl.shaderSource(this.vertexShader, vertexSource);
    gl.compileShader(this.vertexShader);

    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(this.fragmentShader, fragmentSource);
    gl.compileShader(this.fragmentShader);

    this.program = gl.createProgram() as WebGLProgram;
    gl.attachShader(this.program, this.vertexShader);
    gl.attachShader(this.program, this.fragmentShader);
    gl.linkProgram(this.program);

    // Getting the attributes and uniforms
    this.positionAttribute = gl.getAttribLocation(this.program, Attributes.POSITION);
    // this.colorAttribute = gl.getAttribLocation(this.program, Attributes.COLOR);
    // this.mouseUniform = gl.getUniformLocation(this.program, Attributes.Mouse) as WebGLUniformLocation;
    // this.stateUniform = gl.getUniformLocation(this.program, Attributes.State) as WebGLUniformLocation;
    // this.nextStateUniform = gl.getUniformLocation(this.program, Attributes.NextState) as WebGLUniformLocation;

    // Generate Buffers
    this.vertexBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.indexBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  }

  _enableAttributes = () => {
    this.gl.enableVertexAttribArray(this.positionAttribute);
    this.gl.vertexAttribPointer(this.positionAttribute, 3, this.gl.FLOAT, false, 0, 0);
    // this.gl.enableVertexAttribArray(this.colorAttribute);
    // this.gl.vertexAttribPointer(this.colorAttribute, 3, this.gl.FLOAT, false, 0, 0);
  }

  preRender = () => {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }

  render = () => {
    this.preRender();
    this.gl.useProgram(this.program);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this._enableAttributes();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
  }
}
