import { Domain } from 'domain';
import * as THREE from 'three';

// RGB Channel contain 1 if alive and 0 if dead
// Alpha Channel Contains Health of Cell

const Colors = [
    new THREE.Color(0x000000),
    new THREE.Color(0xFFFFFF),
    new THREE.Color(0x0000FF),
    new THREE.Color(0x00FF00),
    new THREE.Color(0x00FFFF),
    new THREE.Color(0xFF0000),
    new THREE.Color(0xFF00FF),
    new THREE.Color(0x000000),
    new THREE.Color(0x000000),
    new THREE.Color(0xFFFF00),
]

const vertSource = `
varying vec2 vUvs;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUvs = uv;
}
`;

const GOLSource = `
precision highp float;
const float distToAccept = 0.003;
const float chanceToAccept = 0.5;

uniform sampler2D uTexture; 
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUvs;

int getNeighbors(vec2 start){
    int neighbors = 0;

    for(int i = -1; i <= 1; i++){
        for(int j = -1; j <= 1; j++){
            neighbors += int(texture2D(uTexture, mod((start + (vec2(i, j) / uResolution)), vec2(1.0))).r);
        }
    }
    
    neighbors -= int(texture2D(uTexture, start).r);
    return neighbors;
}

float getRandom(vec2 pos){
    return fract(sin(dot(pos + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    int neighbors = getNeighbors(vUvs);
    bool alive = texture2D(uTexture, vUvs).r > 0.5;
    float health = texture2D(uTexture, vUvs).a;
    health -= 1.0;
    vec4 status = vec4(0.0, 0.0, 0.0, 0.0);

    // Alive Conditions
    if(alive && (neighbors == 2 || neighbors == 3)){
        // Perfect Population
        health += 2.0;
        status = vec4(1.0);
    } else if(!alive && neighbors == 3){
        // Reproduction
        health += 1.0;
        status = vec4(1.0);
    }
    status.a = clamp(health, 0.0, 9.0);
    gl_FragColor = status;
    
    if(distance (vUvs, uMouse.xy) < distToAccept && getRandom(vUvs) > chanceToAccept){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
}
`;

const drawSource = `
precision mediump float;

uniform sampler2D uTexture; 
uniform vec3 uColor[10];
varying vec2 vUvs;

void main() {
    gl_FragColor = vec4(uColor[int(texture2D(uTexture, vUvs).a)], 1.0);
}
`;

export default class GOLRender {
    // Variables
    size: { height: number, width: number };
    boundingBox: DOMRect;

    // Scenes
    drawScene: THREE.Scene;
    GOLScene: THREE.Scene;

    // Textures
    initialTexture: THREE.DataTexture;

    // Uniforms
    resolution: THREE.Vector2;
    mouse: THREE.Vector2;

    // Geometry and Materials
    geometry: THREE.PlaneGeometry;
    quadMaterial: THREE.ShaderMaterial;
    GOLMaterial: THREE.ShaderMaterial;
    quad: THREE.Mesh;
    GOLMesh: THREE.Mesh;

    // Camera
    camera: THREE.OrthographicCamera;

    // Renderer
    renderer: THREE.WebGLRenderer;

    // Buffers
    frontBuffer: THREE.WebGLRenderTarget;
    backBuffer: THREE.WebGLRenderTarget;

    constructor(canvas: HTMLCanvasElement) {
        // Setting up size and resolution
        this.size = {
            height: canvas.height,
            width: canvas.width
        };

        this.resolution = new THREE.Vector2(this.size.width, this.size.height);
        this.boundingBox = canvas.getBoundingClientRect();

        // Setting up Buffers
        this.frontBuffer = new THREE.WebGLRenderTarget(this.size.width, this.size.height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            stencilBuffer: false
        });

        this.backBuffer = new THREE.WebGLRenderTarget(this.size.width, this.size.height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            stencilBuffer: false
        });

        // setting up scenes
        this.drawScene = new THREE.Scene();
        this.GOLScene = new THREE.Scene();

        // Setting up initial random state
        this.initialTexture = this.createRandomTexture();

        // Setting up mouse
        this.mouse = new THREE.Vector2(-1, -1);


        // Setting up geometry and materials
        this.geometry = new THREE.PlaneGeometry(2, 2);

        this.quadMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: null },
                uColor: { value: Colors }
            },
            vertexShader: vertSource,
            fragmentShader: drawSource
        });

        this.GOLMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: this.initialTexture },
                uResolution: { value: this.resolution },
                uMouse: { value: this.mouse },
                uTime: { value: 0 }
            },
            vertexShader: vertSource,
            fragmentShader: GOLSource
        });


        this.quad = new THREE.Mesh(this.geometry, this.quadMaterial);
        this.drawScene.add(this.quad);

        this.GOLMesh = new THREE.Mesh(this.geometry, this.GOLMaterial);
        this.GOLScene.add(this.GOLMesh);

        // Setting up Camera
        this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);

        // Setting up Renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
        this.renderer.setSize(this.size.width, this.size.height);
    }

    createRandomTexture = (): THREE.DataTexture => {
        const data = new Uint8Array(this.size.width * this.size.height * 4);

        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() > 0.5) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 0;
            }
        }

        const texture = new THREE.DataTexture(data, this.size.width, this.size.height, THREE.RGBAFormat, THREE.UnsignedByteType);
        texture.needsUpdate = true;
        return texture;
    };

    onMouseMove = (event: MouseEvent) => {
        // Convert Global Mouse Position to Local Mouse Position
        // Then Normalize it
        this.mouse.x = (event.clientX - this.boundingBox.left) / this.boundingBox.width;

        // Invert Y
        this.mouse.y = 1.0 - (event.clientY - this.boundingBox.top) / this.boundingBox.height;
    }

    render = () => {
        // Update Uniforms
        this.GOLMaterial.uniforms.uMouse!.value = this.mouse;
        this.GOLMaterial.uniforms.uResolution!.value = this.resolution;
        this.GOLMaterial.uniforms.uTime!.value += 0.001;

        // Render to Front Buffer
        this.renderer.setRenderTarget(this.frontBuffer);
        this.renderer.render(this.GOLScene, this.camera);

        // Render to Screen
        this.quadMaterial.uniforms.uTexture!.value = this.frontBuffer.texture;
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.drawScene, this.camera);

        // Swap Buffers
        const temp = this.frontBuffer;
        this.frontBuffer = this.backBuffer;
        this.backBuffer = temp;

        // Update GOL Material
        this.GOLMaterial.uniforms.uTexture!.value = this.backBuffer.texture;

        window.requestAnimationFrame(this.render);
    }
}
