import { ModelType } from './ModelVersioning';

export class ModelValidator {
    static validateModelStructure(model: any, modelType: ModelType): boolean {
        if (!model || typeof model !== 'object') {
            return false;
        }

        const requiredFields: Record<ModelType, string[]> = {
            fraudDetection: ['threshold', 'parameters', 'weights'],
            sentimentAnalysis: ['vocabulary', 'weights', 'config'],
            transactionPrediction: ['features', 'modelParams', 'metadata']
        };

        const fields = requiredFields[modelType];
        return fields.every(field => field in model);
    }

    static validateModelMetadata(metadata: any): boolean {
        const requiredMetadata = ['createdAt', 'version', 'author'];
        return requiredMetadata.every(field => field in metadata);
    }
}
