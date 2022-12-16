import * as THREE from 'three';
export default class GOLRender {
    // context
    gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext) {
        // Getting the context
        this.gl = gl;
    }
}
