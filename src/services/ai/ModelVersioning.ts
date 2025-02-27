export type ModelType = 'fraudDetection' | 'sentimentAnalysis' | 'transactionPrediction';

export class ModelVersioning {
    private static readonly MODEL_VERSIONS = {
        fraudDetection: '1.0.1',
        sentimentAnalysis: '2.1.0',
        transactionPrediction: '1.2.0'
    };

    static getModelVersion(modelType: ModelType): string {
        if (!this.MODEL_VERSIONS[modelType]) {
            throw new Error(`Invalid model type: ${modelType}`);
        }
        return this.MODEL_VERSIONS[modelType];
    }

    static validateModelCompatibility(modelType: ModelType, version: string): boolean {
        if (!this.MODEL_VERSIONS[modelType]) {
            throw new Error(`Invalid model type: ${modelType}`);
        }
        const currentVersion = this.MODEL_VERSIONS[modelType];
        return this.compareVersions(version, currentVersion) >= 0;
    }

    static updateModelVersion(modelType: ModelType, newVersion: string): void {
        if (!this.isValidVersion(newVersion)) {
            throw new Error(`Invalid version format: ${newVersion}`);
        }
        this.MODEL_VERSIONS[modelType] = newVersion;
    }

    private static isValidVersion(version: string): boolean {
        const versionPattern = /^\d+\.\d+\.\d+$/;
        return versionPattern.test(version);
    }

    private static compareVersions(v1: string, v2: string): number {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        
        for (let i = 0; i < 3; i++) {
            if (parts1[i] > parts2[i]) return 1;
            if (parts1[i] < parts2[i]) return -1;
        }
        return 0;
    }
}
