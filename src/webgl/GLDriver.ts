class GLDriver{
  gl? : WebGLRenderingContext;

  Init(gl: WebGLRenderingContext){
    this.gl = gl;
  }

  clear(r: number, g: number, b: number, a: number){
    if(!this.gl) return;

    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  
  }
}

const GLD = new GLDriver();

export default GLD;