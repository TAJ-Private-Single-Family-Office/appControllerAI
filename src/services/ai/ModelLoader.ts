import { BaseModel } from './types/ModelInterfaces';
import { ModelType } from './ModelVersioning';
import { ModelValidator } from './ModelValidator';

export class ModelLoader {
    private static instance: ModelLoader;
    
    private constructor() {}

    static getInstance(): ModelLoader {
        if (!ModelLoader.instance) {
            ModelLoader.instance = new ModelLoader();
        }
        return ModelLoader.instance;
    }

    async loadModel(modelType: ModelType, modelId: string): Promise<BaseModel> {
        // Implement actual model loading logic here
        throw new Error('Not implemented');
    }

    async preloadModels(modelTypes: ModelType[]): Promise<void> {
        const loadPromises = modelTypes.map(type => this.loadModel(type, `${type}_default`));
        await Promise.all(loadPromises);
    }

    async validateAndLoad(modelType: ModelType, modelId: string): Promise<BaseModel> {
        const model = await this.loadModel(modelType, modelId);
        if (!ModelValidator.validateModelStructure(model, modelType)) {
            throw new Error(`Invalid model structure for ${modelType}`);
        }
        return model;
    }
}
