import GLD from '../GLDriver';
import ModelType from '../ModelType';
import Shader from '../Shaders/ModelShader';
import Instance from '../Instance';

interface ModelDict{
  [id: string]: {type: ModelType, instances: Instance[]}
}


export default class ModelRenderer {

  shader: Shader;
  models: ModelDict;


  constructor(shader: Shader) {
    this.shader = shader;
    this.models = {} as ModelDict;
  }

  registerModel = (model : ModelType, id : string) => {
    if(!this.models[id]){
      this.models[id] = {type: model, instances: []};
    }
  }

  addInstance = (instance : Instance, id : string) => {
    if(this.models[id]){
      this.models[id]?.instances.push(instance);
    }
  }

  preRender = () => {
    GLD.viewport();
    GLD.depthTest(true);
  }

  render = () => {
    this.preRender();
    this.shader.use();
    Object.keys(this.models).forEach((model) => {
      this.models[model]?.type.use(this.shader);
      this.models[model]?.instances.forEach((instance) => {
        GLD.DrawTriangles(this.models[model]!.type.indices.length);
      });
  });
}
}